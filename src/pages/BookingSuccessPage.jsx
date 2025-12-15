import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const BookingSuccessPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [copying, setCopying] = useState(false);

  const handleCopy = async () => {
    if (!id) return;
    try {
      setCopying(true);
      await navigator.clipboard.writeText(id);
      toast({
        title: 'Copied',
        description: 'Booking reference copied to clipboard.',
        className: 'bg-blue-500 text-white',
      });
    } catch (e) {
      toast({
        title: 'Copy failed',
        description: 'Please copy the reference manually.',
        variant: 'destructive',
      });
    } finally {
      setCopying(false);
    }
  };

  return (
    <div className="bg-gray-50">
      <PageHeader
        title="Booking request received"
        subtitle="We’ll contact you shortly to confirm availability."
        breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'Book', link: '/book' }, { name: 'Success' }]}
      />

      <main className="container mx-auto px-4 py-12">
        <Card className="shadow-lg max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Your reference</CardTitle>
            <CardDescription>Keep this in case you need to follow up.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-white border rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <code className="text-sm break-all">{id || '—'}</code>
                <Button type="button" variant="outline" onClick={handleCopy} disabled={!id || copying}>
                  {copying ? 'Copying…' : 'Copy'}
                </Button>
              </div>
            </div>

            <div className="text-sm text-gray-700 space-y-2">
              <p><span className="font-semibold">Payment:</span> cash on arrival.</p>
              <p><span className="font-semibold">Confirmation:</span> we’ll message/call you to confirm and arrange pickup/delivery.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link to="/book">Make another booking</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/">Back to home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default BookingSuccessPage;
