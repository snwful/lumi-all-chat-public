
import React from 'react';
import { SubscriptionPlan }
from '../types';
import { CheckIcon } from '../constants';
import Button from './Button';
import Card from './Card';

interface PricingCardProps {
  plan: SubscriptionPlan;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
  return (
    <Card className={`flex flex-col h-full ${plan.isPopular ? 'border-2 border-brand-accent shadow-2xl relative' : 'border border-brand-border'}`}>
      {plan.isPopular && (
        <div className="absolute top-0 right-0 -mt-3 mr-3">
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-brand-accent text-white">
            Popular
          </span>
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-brand-primary">{plan.name}</h3>
        <p className="mt-2 text-4xl font-bold text-brand-primary">{plan.price}</p>
        <p className="mt-1 text-sm text-brand-secondary">{plan.priceDetails}</p>
      </div>
      <div className="p-6 flex-grow">
        <ul role="list" className="space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start">
              <div className="flex-shrink-0">
                <CheckIcon className="h-5 w-5 text-brand-success" />
              </div>
              <p className="ml-3 text-sm text-brand-secondary">{feature}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 mt-auto">
        <Button variant={plan.isPopular ? 'primary' : 'outline'} className="w-full">
          {plan.ctaText}
        </Button>
      </div>
    </Card>
  );
};

export default PricingCard;
