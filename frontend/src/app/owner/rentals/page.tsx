"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useOwnerRentals from '@/hooks/use-owner-rentals';
import { Rental } from '@/types';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Mock data
// const rentals = [
//   { id: 'r1', vehicleName: 'Jeep Wrangler', renterName: 'Alex Johnson', date: '2024-06-15', earnings: 250 },
//   { id: 'r2', vehicleName: 'Porsche 911', renterName: 'Maria Garcia', date: '2024-06-12', earnings: 700 },
//   { id: 'r3', name: 'Jeep Wrangler', renterName: 'Sam Lee', date: '2024-05-28', earnings: 300 },
// ];

// const rentals = useState([], setRentals);


export default function OwnerRentalHistoryPage() {
  const [token, setToken] = useState<string | null>(null);
  const [page, setPage] = useState(0);
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
      }
    }, []);
    // useEffect(() => {
    // const { paginatedRentals, loading, error } = useOwnerRentals(token, page, 1);

    // }, [page]);
    const { paginatedRentals, loading, error } = useOwnerRentals(token, page, 10);
  return (
    loading ? (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  ) : error ? (
    <div className="container mx-auto px-4 py-12">
      <p className="text-red-500">{error}</p>
    </div>
  ) : (
    <div className="container mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Rental History</CardTitle>
          <CardDescription>A log of all completed rentals for your vehicles.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle</TableHead>
                <TableHead>Renter</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Earnings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRentals?.content.map((rental: Rental) => (
                <TableRow key={rental.id}>
                  <TableCell className="font-medium"><Link href={`/vehicle/${rental.vehicle.id}`}>{rental.vehicle.name}</Link></TableCell>
                  <TableCell>{`${rental.renter.name}(${rental.renter.email})`}</TableCell>
                  <TableCell>{rental.startTime}</TableCell>
                  <TableCell>{rental.completed ? <Badge variant={"secondary"} className="bg-green-100 text-green-800">Complted</Badge> : <Badge variant={"secondary"} className="whitespace-nowrap bg-red-100 text-red-800">Not Completed</Badge>}</TableCell>
                  <TableCell className="text-right font-semibold text-primary">+${rental.totalCost.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className='width-full flex justify-end gap-2'>
          {!paginatedRentals?.first && (<Button className="mt-4" onClick={() => setPage(page - 1)}>Previous</Button>)}
          {!paginatedRentals?.last && (<Button className="mt-4" onClick={() => setPage(page + 1)}>Next</Button>)}
          </div>
        </CardContent>
      </Card>
    </div>
  ));
}
