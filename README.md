# MealFlow - Plataforma SaaS de Gestão de Refeitórios

## Visão Geral do Sistema

O MealFlow é uma plataforma SaaS (Software as a Service) que revoluciona a gestão de refeitórios ao unificar todos os processos operacionais em um único ecossistema digital. A plataforma responde aos desafios contemporâneos de:

- Transparência nutricional
- Eficiência operacional
- Conformidade regulatória (HACCP, RGPD)
- Otimização baseada em dados reais
- Feedback contínuo

### Proposta de Valor

- **Integração Total**: Unificação de todos os processos desde planejamento até feedback
- **Abordagem Data-Driven**: Coleta e análise sistemática para otimização contínua
- **Flexibilidade Operacional**: Adaptação a diversos modelos de negócio
- **Conformidade Regulatória**: Garantia de compliance com requisitos legais
- **Experiência do Usuário Diferenciada**: Interfaces intuitivas para todos stakeholders

## Arquitetura do Sistema

### Princípios Arquiteturais

- **Clean Architecture** (Robert C. Martin)
  - Separação clara entre regras de negócio e mecanismos de entrega
  - Independência de frameworks e tecnologias específicas
  - Testabilidade em todos os níveis
  - Compatibilidade com os princípios SOLID

### Camadas da Arquitetura

- **Entidades/Core**: Negócio puro sem dependências externas
- **Casos de Uso**: Lógica de aplicação
- **Adaptadores**: Ports e interfaces
- **Frameworks e Drivers**: Next.js, Prisma, Bull/BullMQ

### Modelo Multi-Tenant & Multi-Database

- **Domínios isolados**:
  - root: Admin SaaS (root.mealflow.net)
  - tenant: Entidade contratante do SaaS (ex: empresaX.mealflow.net)
  - client: Unidades organizacionais do tenant (ex: filialY)
- Cada tenant e client possuem repositórios dinâmicos independentes
- Bases de dados completamente isoladas
- Conexões gerenciadas via DynamicSupervisor + cache ETS

## Estratégia Multi-Tenant Detalhada

### Repositórios

- **mealflow_root**: Base de dados global do Admin SaaS
- **TenantRepo**: Repositório por tenant, sob demanda ({tenant, nil})
- **ClientRepo**: Repositório por client, sob demanda ({tenant, client})

### Gestão de Recursos

- **Idle Timeout**: Repositórios desligam após 5 minutos sem uso
- **Limites de Bases**: 200 bases por servidor, alarme em 80%
- **Pools de Conexões**:
  - Pool inicial: 5 conexões
  - Incremento: passos de 5 até máximo de 100
  - Idle timeout: 1 minuto

### Provisionamento Automatizado

- **Tenants**: Via Bull job CreateTenant (SLA: 30 segundos)
  - Criar database tenant_[subdomain]
  - Executar migrações Ecto
  - Seed de dados iniciais
  - Configurar DNS/sub-domínio
  - Enviar email de boas-vindas
- **Clients**: Via Bull job CreateClient (SLA: 20 segundos)
  - Criar database tenant_[subdomain]_client_[client_id]
  - Executar migrações Ecto
  - Seed de dados iniciais
  - Registrar no TenantRepo

### Desprovisionamento

- **Tenants**: Dados mantidos por 90 dias antes da exclusão definitiva
- **Clients**: Possibilidade de remoção individual

## Modelagem de Dados

### mealflow_root

- Tabelas: tenants, modules, submodules, allergens, nutriscores
- PK: UUID v7

### mealflow_{tenant}

- Tabelas: clients, tenant_users, roles, permissions, module_catalog_cache
- Instância Bull local

### mealflow_{tenant}_{client}

- Tabelas: client_users, departments, dining_halls, menus, reservations

## Entidades do Sistema e Terminologia

### Estrutura Organizacional

- **Tenant**: Entidade contratante do SaaS (nível superior)
  - Subdomínio próprio, base isolada, branding personalizado
- **Cliente (Client)**: Unidade organizacional de um tenant
  - Gerencia um ou mais refeitórios, base isolada
- **Refeitório (Dining Hall)**: Unidade operacional básica
  - Centro de ativação de módulos, capacidade, períodos, regras
- **Departamento (Department)**: Subdivisão organizacional de um client
  - Hierarquia até 3 níveis, agrupamento de consumidores

### Entidades Operacionais

- **Reserva (Reservation)**: Garantia de refeição para consumidor
- **Consumidor (Consumer)**: Utilizador final do sistema
- **Período de Refeição (Meal Period)**: Janela horária de serviço
- **Menu (Ementa)**: Planejamento de refeições para período
- **Refeição (Meal)**: Item específico do catálogo gastronômico
- **Categoria/Tipo de Refeição**: Classificações das refeições

### Interfaces e Pontos de Acesso

- **MicroSite**: Interface web para consumidores
- **Kiosk**: Terminal físico nos refeitórios
- **Monitor de Cozinha**: Display operacional nas cozinhas
- **Admin SaaS**: Interface administrativa central
- **Tenant App**: Aplicação específica para cada tenant

### Funcionalidades e Conceitos

- **Module**: Conjunto de funcionalidades ativáveis por Dining Hall
- **Submodule**: Extensão de um module com funcionalidades adicionais
- **Nutriscore**: Sistema de classificação nutricional (A-E)
- **Blackout**: Período de indisponibilidade programada
- **Relatório Gerencial**: Documento para análise de dados

### Tipos de Utilizadores

- **Super-Admin**: Acesso global ao Admin SaaS
- **Tenant Admin**: Gerencia configurações do tenant
- **Gestor de Refeitório**: Gerencia operações de Dining Hall
- **Operador**: Interage via Kiosk ou Monitor de Cozinha
- **Consumidor**: Realiza reservas no Microsite ou Kiosk

## Aplicações Principais

### Admin SaaS App (root.mealflow.net)

- **Responsabilidades**:
  - Gestão de tenants (provisionamento, configuração)
  - Catálogo e licenciamento de módulos
  - Faturação e billing
  - Configurações globais
  - Compliance e auditoria
  - Infraestrutura e observabilidade
- **Arquitetura**:
  - Banco de dados central mealflow_root
  - Modelo RBAC (Super-Admin, Support, Analista)
  - Jobs background (Bull)

### Tenant App ({tenant}.mealflow.net)

- **Funcionalidades**:
  - Dashboard operacional
  - Shell para módulos contratados
  - Interfaces especializadas (Microsite, Kiosk, Kitchen Monitor)
- **Arquitetura**:
  - Bancos isolados por tenant e client
  - Modelo RBAC específico
  - Repositórios dinâmicos sob demanda
- **Diferenciais**:
  - UI, logotipo e cores próprios
  - Interface responsiva
  - Sistema de notificações e alertas

## Considerações Técnicas

### Provisionamento e Cotas

- **Provisionamento**: Somente manual via Admin SaaS (sem self-service)
- **Cotas**: Sem limites para número de clients, refeitórios ou utilizadores

### Segurança e Compliance

- JWT para autenticação
- Conformidade GDPR/RGPD
- Logs de auditoria completos
- Políticas de retenção de dados

### Performance e Disponibilidade

- RTO (Recovery Time Objective): < 4 horas
- TTFB (Time To First Byte): Monitoramento contínuo
- WCAG: Conformidade nível AA para acessibilidade

### Integrações

- ERP para exportação financeira
- LDAP/AD para sincronização de utilizadores
- Gateways de pagamento
- Visão futura: IoT para equipamentos de cozinha

## Módulos e Submódulos

Os módulos representam conjuntos de funcionalidades que podem ser ativados individualmente por Dining Hall, com precificação específica:

- **Reservas**: Gestão completa do ciclo de reservas
  - Submódulos: Reservas em grupo, Reservas recorrentes
- **Ementas**: Planejamento e publicação de ementas
  - Submódulos: Rotação de ementas, Sazonalidade
- **HACCP**: Controle de segurança alimentar
  - Submódulos: Registos de temperatura, Rastreabilidade
- **Analytics**: Análise de dados operacionais
  - Submódulos: Previsão de demanda, Otimização de compras
- **Pagamentos**: Integração com sistemas de pagamento
  - Submódulos: Faturação, Gestão de subsídios

## Considerações de Desenvolvimento

### Tecnologias Recomendadas

- Backend: Next.js (estrutura existente)
- Frontend: React
- Banco de Dados: PostgreSQL
- Filas de Trabalho: Bull/BullMQ
- Monitoramento: Telemetry + Prometheus

### Prioridades de Implementação

- Infraestrutura multi-tenant e multi-database
- Admin SaaS (provisionamento básico)
- Tenant App core (shell e módulo de autenticação)
- Módulos essenciais (Reservas, Ementas)
- Interfaces especializadas (Microsite, Kiosk)

### Critérios de Qualidade

- Cobertura de testes: Mínimo 80%
- Documentação: Completa para APIs e módulos
- Performance: TTFB < 200ms para operações críticas
- Segurança: Revisões regulares, pentest anual
