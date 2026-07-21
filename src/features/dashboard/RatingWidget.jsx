import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { updateServiceRequestData } from '../../api/client';

export function RatingWidget({ request, isCustomer, onRated }) {
  const [hover, setHover] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  
  const currentRating = isCustomer ? request.mechanic_rating : request.customer_rating;
  const hasRated = currentRating !== null && currentRating !== undefined;

  const handleRate = async (rating) => {
    if (hasRated || submitting) return;
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const data = isCustomer ? { mechanic_rating: rating } : { customer_rating: rating };
      await updateServiceRequestData(token, request.id, data);
      if (onRated) onRated();
    } catch (err) {
      console.error("Failed to submit rating", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-borderLight w-full">
      <span className="text-sm font-medium text-textMain">
        {hasRated 
          ? (isCustomer ? "You rated the mechanic:" : "You rated the customer:") 
          : (isCustomer ? "Rate the mechanic:" : "Rate the customer:")}
      </span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={hasRated || submitting}
            onClick={() => handleRate(star)}
            onMouseEnter={() => !hasRated && setHover(star)}
            onMouseLeave={() => !hasRated && setHover(0)}
            className={`p-1 transition-colors ${hasRated || submitting ? 'cursor-default opacity-100' : 'cursor-pointer hover:scale-110'}`}
          >
            <Star
              size={24}
              className={
                star <= (hasRated ? currentRating : hover)
                  ? 'fill-brandYellow text-brandYellow'
                  : 'text-borderDark'
              }
            />
          </button>
        ))}
      </div>
    </div>
  );
}
