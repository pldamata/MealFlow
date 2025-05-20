import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  SortAsc,
  SortDesc
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { cn } from '../../utils/cn';

// Sample data
const meals = [
  {
    id: '1',
    name: 'Bacalhau à Brás',
    description: 'Prato tradicional português com bacalhau desfiado, batata palha e ovos',
    type: { id: '1', name: 'Peixe' },
    category: { id: '1', name: 'Prato Principal' },
    nutritionalInfo: 'Proteínas: 22g, Carboidratos: 35g, Gorduras: 15g',
    allergens: ['Peixe', 'Ovos', 'Glúten'],
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    nutriscore: 'A'
  },
  {
    id: '2',
    name: 'Bife de Peru Grelhado',
    description: 'Bife de peru grelhado com acompanhamento de arroz e legumes',
    type: { id: '2', name: 'Carne' },
    category: { id: '1', name: 'Prato Principal' },
    nutritionalInfo: 'Proteínas: 28g, Carboidratos: 30g, Gorduras: 8g',
    allergens: [],
    image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    nutriscore: 'B'
  },
  {
    id: '3',
    name: 'Lasanha de Legumes',
    description: 'Lasanha vegetariana com camadas de legumes, molho de tomate e bechamel',
    type: { id: '3', name: 'Vegetariano' },
    category: { id: '1', name: 'Prato Principal' },
    nutritionalInfo: 'Proteínas: 12g, Carboidratos: 42g, Gorduras: 18g',
    allergens: ['Glúten', 'Leite'],
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    nutriscore: 'A'
  },
  {
    id: '4',
    name: 'Salmão Grelhado',
    description: 'Filé de salmão grelhado com molho de ervas e batata assada',
    type: { id: '1', name: 'Peixe' },
    category: { id: '1', name: 'Prato Principal' },
    nutritionalInfo: 'Proteínas: 25g, Carboidratos: 20g, Gorduras: 22g',
    allergens: ['Peixe'],
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    nutriscore: 'A'
  },
  {
    id: '5',
    name: 'Arroz de Pato',
    description: 'Arroz de pato tradicional português com chouriço e pato desfiado',
    type: { id: '2', name: 'Carne' },
    category: { id: '1', name: 'Prato Principal' },
    nutritionalInfo: 'Proteínas: 24g, Carboidratos: 45g, Gorduras: 18g',
    allergens: [],
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
    nutriscore: 'B'
  }
];

const mealTypes = [
  { id: '1', name: 'Peixe' },
  { id: '2', name: 'Carne' },
  { id: '3', name: 'Vegetariano' },
  { id: '4', name: 'Dieta' }
];

const mealCategories = [
  { id: '1', name: 'Prato Principal' },
  { id: '2', name: 'Entrada' },
  { id: '3', name: 'Sobremesa' },
  { id: '4', name: 'Sopa' }
];

const NutriscoreBadge: React.FC<{ score: string }> = ({ score }) => {
  const colors = {
    'A': 'bg-green-100 text-green-800',
    'B': 'bg-green-100 text-green-800',
    'C': 'bg-yellow-100 text-yellow-800',
    'D': 'bg-orange-100 text-orange-800',
    'E': 'bg-red-100 text-red-800'
  };
  
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      colors[score as keyof typeof colors]
    )}>
      Nutriscore {score}
    </span>
  );
};

const MealsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  // Filter meals based on search term and filters
  const filteredMeals = meals.filter(meal => {
    const matchesSearch = meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meal.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType ? meal.type.id === selectedType : true;
    const matchesCategory = selectedCategory ? meal.category.id === selectedCategory : true;
    
    return matchesSearch && matchesType && matchesCategory;
  });
  
  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Refeições</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gerencie o catálogo de refeições disponíveis no sistema
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button leftIcon={<Plus size={16} />}>
            Nova Refeição
          </Button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Pesquisar refeições..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search size={18} />}
            />
          </div>
          
          <div>
            <select
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">Todos os Tipos</option>
              {mealTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <select
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Todas as Categorias</option>
              {mealCategories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {filteredMeals.length} refeições encontradas
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100">
              <Filter size={18} />
            </button>
            <button className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100">
              <SortAsc size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Meals list */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Refeição
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nutriscore
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alergénios
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMeals.map((meal) => (
                <tr key={meal.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-md object-cover" src={meal.image} alt={meal.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{meal.name}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{meal.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {meal.type.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{meal.category.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <NutriscoreBadge score={meal.nutriscore} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {meal.allergens.length > 0 ? (
                        meal.allergens.map((allergen, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                            {allergen}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">Nenhum</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-emerald-600 hover:text-emerald-900 mr-3">
                      <Edit size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Anterior
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Próximo
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Mostrando <span className="font-medium">1</span> a <span className="font-medium">5</span> de <span className="font-medium">12</span> resultados
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Anterior</span>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-emerald-50 text-sm font-medium text-emerald-600 hover:bg-emerald-100">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Próximo</span>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealsPage;
