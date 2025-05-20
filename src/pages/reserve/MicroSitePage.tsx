import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  User, 
  LogOut,
  AlertCircle
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { cn } from '../../utils/cn';

// Sample data
const weekDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
const currentDate = new Date();
const weekDates = Array.from({ length: 7 }, (_, i) => {
  const date = new Date(currentDate);
  date.setDate(currentDate.getDate() - currentDate.getDay() + i + 1);
  return date;
});

const meals = [
  {
    id: '1',
    name: 'Bacalhau à Brás',
    description: 'Prato tradicional português com bacalhau desfiado, batata palha e ovos',
    type: 'Peixe',
    category: 'Prato Principal',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    nutriscore: 'A',
    allergens: ['Peixe', 'Ovos', 'Glúten']
  },
  {
    id: '2',
    name: 'Bife de Peru Grelhado',
    description: 'Bife de peru grelhado com acompanhamento de arroz e legumes',
    type: 'Carne',
    category: 'Prato Principal',
    image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    nutriscore: 'B',
    allergens: []
  },
  {
    id: '3',
    name: 'Lasanha de Legumes',
    description: 'Lasanha vegetariana com camadas de legumes, molho de tomate e bechamel',
    type: 'Vegetariano',
    category: 'Prato Principal',
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    nutriscore: 'A',
    allergens: ['Glúten', 'Leite']
  }
];

const periods = [
  { id: '1', name: 'Almoço', startTime: '12:00', endTime: '14:00' },
  { id: '2', name: 'Jantar', startTime: '19:00', endTime: '21:00' }
];

const userReservations = [
  { id: '1', date: '2023-05-08', periodId: '1', mealId: '1' },
  { id: '2', date: '2023-05-10', periodId: '2', mealId: '3' }
];

const userConsumptions = [
  { 
    id: '1', 
    date: '2023-05-05', 
    mealName: 'Bacalhau à Brás',
    mealImage: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    rating: 5,
    feedback: 'Excelente prato, muito saboroso!'
  },
  { 
    id: '2', 
    date: '2023-05-04', 
    mealName: 'Lasanha de Legumes',
    mealImage: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    rating: 4,
    feedback: 'Muito bom, mas poderia ter mais molho.'
  },
  { 
    id: '3', 
    date: '2023-05-03', 
    mealName: 'Bife de Peru Grelhado',
    mealImage: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    rating: null,
    feedback: null
  }
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

const MicroSitePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reservations' | 'ratings'>('reservations');
  const [selectedDate, setSelectedDate] = useState<Date>(weekDates[0]);
  const [selectedPeriod, setSelectedPeriod] = useState<string>(periods[0].id);
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' });
  };
  
  const isDateSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };
  
  const isReserved = (date: Date, periodId: string, mealId: string) => {
    const dateStr = date.toISOString().split('T')[0];
    return userReservations.some(
      r => r.date === dateStr && r.periodId === periodId && r.mealId === mealId
    );
  };
  
  const handleReservation = () => {
    if (!selectedMeal) return;
    
    alert(`Reserva confirmada para ${selectedDate.toLocaleDateString('pt-PT')} - ${periods.find(p => p.id === selectedPeriod)?.name}`);
    setSelectedMeal(null);
  };
  
  const handleRating = (consumptionId: string, rating: number) => {
    alert(`Avaliação de ${rating} estrelas registrada com sucesso!`);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-emerald-600 text-white p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="https://images.unsplash.com/photo-1563694983011-6f4d90358083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
              alt="Logo da Empresa"
              className="h-10 w-auto mr-4"
            />
            <div>
              <h1 className="text-xl font-bold">Portal do Consumidor</h1>
              <p className="text-emerald-100">Refeitório Central</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-medium">João Silva</p>
              <p className="text-sm text-emerald-100">Departamento de TI</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center">
              <User className="h-6 w-6" />
            </div>
            <button className="p-2 rounded-full hover:bg-emerald-500">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex">
          <button
            className={cn(
              "py-4 px-6 text-sm font-medium border-b-2 focus:outline-none",
              activeTab === 'reservations'
                ? "border-emerald-500 text-emerald-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
            onClick={() => setActiveTab('reservations')}
          >
            Reservas de Refeições
          </button>
          <button
            className={cn(
              "py-4 px-6 text-sm font-medium border-b-2 focus:outline-none",
              activeTab === 'ratings'
                ? "border-emerald-500 text-emerald-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
            onClick={() => setActiveTab('ratings')}
          >
            Avaliação de Refeições
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {activeTab === 'reservations' ? (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Reservas de Refeições</h2>
            
            {/* Calendar navigation */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-medium text-gray-700">Semana de {formatDate(weekDates[0])} a {formatDate(weekDates[6])}</h3>
              <div className="flex space-x-2">
                <button className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Week days */}
            <div className="grid grid-cols-7 gap-2 mb-6">
              {weekDates.map((date, index) => (
                <button
                  key={index}
                  className={cn(
                    "flex flex-col items-center p-3 rounded-md transition-colors",
                    isDateSelected(date)
                      ? "bg-emerald-100 text-emerald-700"
                      : "hover:bg-gray-100"
                  )}
                  onClick={() => setSelectedDate(date)}
                >
                  <span className="text-xs font-medium">{weekDays[index]}</span>
                  <span className="text-lg font-bold mt-1">{date.getDate()}</span>
                  <span className="text-xs text-gray-500 mt-1">{date.toLocaleDateString('pt-PT', { month: 'short' })}</span>
                </button>
              ))}
            </div>
            
            {/* Meal periods */}
            <div className="mb-6">
              <div className="flex space-x-4 mb-4">
                {periods.map(period => (
                  <button
                    key={period.id}
                    className={cn(
                      "px-4 py-2 rounded-md text-sm font-medium flex items-center",
                      selectedPeriod === period.id
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    )}
                    onClick={() => setSelectedPeriod(period.id)}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    {period.name} ({period.startTime} - {period.endTime})
                  </button>
                ))}
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Refeições disponíveis para {selectedDate.toLocaleDateString('pt-PT')} - {periods.find(p => p.id === selectedPeriod)?.name}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {meals.map(meal => {
                    const reserved = isReserved(selectedDate, selectedPeriod, meal.id);
                    
                    return (
                      <div
                        key={meal.id}
                        className={cn(
                          "border rounded-lg overflow-hidden transition-all",
                          selectedMeal === meal.id
                            ? "ring-2 ring-emerald-500"
                            : "hover:shadow-md",
                          reserved
                            ? "bg-emerald-50 border-emerald-200"
                            : "bg-white border-gray-200"
                        )}
                      >
                        <div className="h-40 overflow-hidden">
                          <img
                            src={meal.image}
                            alt={meal.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="text-base font-medium text-gray-900">{meal.name}</h5>
                            <NutriscoreBadge score={meal.nutriscore} />
                          </div>
                          
                          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{meal.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {meal.type}
                            </span>
                            
                            {meal.allergens.length > 0 && (
                              <div className="flex items-center text-amber-600 text-xs">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                <span>{meal.allergens.length} alérgenos</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="mt-4">
                            {reserved ? (
                              <div className="bg-emerald-100 text-emerald-800 py-2 px-3 rounded-md text-sm font-medium flex items-center justify-center">
                                <Calendar className="h-4 w-4 mr-2" />
                                Reservado
                              </div>
                            ) : (
                              <button
                                className={cn(
                                  "w-full py-2 px-3 rounded-md text-sm font-medium",
                                  selectedMeal === meal.id
                                    ? "bg-emerald-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                )}
                                onClick={() => setSelectedMeal(meal.id)}
                              >
                                Selecionar
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {selectedMeal && (
                  <div className="mt-6 flex justify-end">
                    <Button onClick={handleReservation}>
                      Confirmar Reserva
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Avaliação de Refeições</h2>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Informação</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>Você pode avaliar as refeições consumidas nos últimos 3 dias. Sua avaliação é importante para melhorarmos nosso serviço.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {userConsumptions.map(consumption => (
                <div key={consumption.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 h-40 md:h-auto">
                      <img
                        src={consumption.mealImage}
                        alt={consumption.mealName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 md:w-3/4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{consumption.mealName}</h3>
                        <span className="text-sm text-gray-500">
                          {new Date(consumption.date).toLocaleDateString('pt-PT')}
                        </span>
                      </div>
                      
                      {consumption.rating ? (
                        <div className="mt-4">
                          <p className="text-sm text-gray-700 mb-2">Sua avaliação:</p>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-5 w-5",
                                  i < consumption.rating!
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                )}
                              />
                            ))}
                            <span className="ml-2 text-sm text-gray-600">
                              {consumption.rating}/5
                            </span>
                          </div>
                          
                          {consumption.feedback && (
                            <div className="mt-3 bg-gray-50 p-3 rounded-md">
                              <p className="text-sm text-gray-700">{consumption.feedback}</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="mt-4">
                          <p className="text-sm text-gray-700 mb-2">Avalie esta refeição:</p>
                          <div className="flex items-center mb-4">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <button
                                key={i}
                                onClick={() => handleRating(consumption.id, i + 1)}
                                className="h-8 w-8 focus:outline-none"
                              >
                                <Star
                                  className="h-6 w-6 text-gray-300 hover:text-yellow-400"
                                />
                              </button>
                            ))}
                          </div>
                          
                          <textarea
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            rows={3}
                            placeholder="Deixe um comentário sobre esta refeição (opcional)"
                          ></textarea>
                          
                          <div className="mt-3 flex justify-end">
                            <Button size="sm">
                              Enviar Avaliação
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MicroSitePage;
