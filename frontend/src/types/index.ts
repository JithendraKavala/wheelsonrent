export type Vehicle = {
  id: number;
  name: string;
  brand: string;
  model: string;
  type: 'CAR' | 'BIKE' | 'TRUCK' | 'VAN';
  rentPerHour: number;
  seatCount: number;
  fuelType: 'Electric' | 'Gasoline' | 'Diesel' | 'Hybrid';
  gearType: 'Automatic' | 'Manual';
  imagePath: string;
  description: string;
  owner: {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
  };
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE' | 'UNAVAILABLE' | 'CHECKING';
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  available: boolean;
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
};

export type Rental = {
  id: number;
  completed: boolean;
  startTime: string;
  endTime: string;
  totalCost: number;
  vehicle : {
    id: number; 
    name: string;
  }
  renter : {
    id: number;
    name: string;
    email: string;
  }
}

export type PaginatedRentals = {
  content: Rental[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // current page index
  first: boolean;
  last: boolean;
  numberOfElements: number;
};

export type OwnerDashBoardStats = {
  totalVehiclesCount: number;
  approvedVehiclesCount: number;
  pendingVehiclesCount: number;
  totalEarningsAmount: number;
  recentRentals: Rental[];
};
export type User = {
  id: string;
  fullName: string;
  email: string;
  role: 'renter' | 'owner' | 'admin';
  status: 'active' | 'blocked';
};

export type Booking = {
  id: string;
  vehicleId: string;
  renterId: string;
  ownerId: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: 'upcoming' | 'completed' | 'cancelled';
};

export type Review = {
  id: string;
  vehicleId: string;
  userId: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  rating: number; // 1-5
  comment: string;
  date: Date;
};

// types.ts or in the same fi

export interface RentalHistory {
  id: number;
  startTime: string;
  endTime: string;
  totalCost: number;
  completed: boolean;
  vehicle: Vehicle;
}
