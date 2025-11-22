import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Zap, Users, Gauge, Cog } from "lucide-react";
import ContactModal from "@/components/ContactModal";

const iconMap = {
  engine: <Gauge className="h-3 w-3 mr-1 text-gray-700" />,
  transmission: <Cog className="h-3 w-3 mr-1 text-gray-700" />,
  capacity: <Users className="h-3 w-3 mr-1 text-gray-700" />,
  feature: <Zap className="h-3 w-3 mr-1 text-gray-700" />,
};

const VehicleCard = ({ vehicle, index, type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getSpecIcon = (specType) => {
    return iconMap[specType] || <Zap className="h-3 w-3 mr-1 text-gray-700" />;
  };

  return (
    <>
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        context={{
          vehicleName: vehicle.name,
          vehiclePrice: `$${vehicle.price}`,
          messageType: "rental",
        }}
      />
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bike-card h-full flex flex-col" 
    >
      <Card className="overflow-hidden border-0 shadow-lg h-full flex flex-col">
        <div className="relative h-56 overflow-hidden">
          <img 
            alt={`${vehicle.name} ${type}`}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            src={vehicle.image || "/wave01.webp"} 
            srcSet={vehicle.imageSrcSet}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          <Badge
            variant="secondary"
            className="absolute top-3 right-3 bg-blue-600 text-white text-sm px-3 py-1"
          >
            ${vehicle.price}/day
          </Badge>
        </div>
        <CardContent className="p-5 flex-grow">
          <h3 className="text-xl font-bold mb-2 text-gray-900">{vehicle.name}</h3>
          <p className="text-gray-700 text-sm mb-4 flex-grow">{vehicle.description}</p>
          <div className="grid grid-cols-2 gap-2 mt-auto">
            {vehicle.specs.map((spec, i) => (
              <span
                key={i}
                className="text-xs bg-gray-200 rounded-full px-3 py-1.5 text-gray-800 inline-flex items-center"
              >
                {getSpecIcon(spec.type)} {spec.value}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-5 pt-0 mt-auto">
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="outline"
            className="w-full border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white transition-colors"
          >
            Book Now
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
    </>
  );
};

export default VehicleCard;