export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  databaseConfig: DatabaseConfig;
}
