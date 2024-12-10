import { TSelectProduct } from "@/types/stripe";
import {
  CheckIcon,
  CreditCardIcon,
  XIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSubscription } from "../../hooks/use-subscription";
import { STRIPE_PLAN_NAMES, TRIAL_DAYS } from "@/config";

export const ProductCard = ({ product }: { product: TSelectProduct }) => {
  const { goToCheckout, goToPortal, subscription } = useSubscription();

  return (
    <Card className="w-full max-w-md transition-all hover:shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-gray-800">
            {product.productName}
          </CardTitle>
          <Badge variant={product.productActive ? "default" : "destructive"}>
            {product.productActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <CreditCardIcon className="w-5 h-5 text-primary mr-2" />
            <span className="text-2xl font-bold text-primary">
              {product.priceAmount}
            </span>
          </div>
          <span className="text-sm text-muted-foreground capitalize">
            {product.recurringInterval}
          </span>
        </div>

        <div className="space-y-3 text-sm">
          {product.productDescription && (
            <p className="text-muted-foreground">
              {product.productDescription}
            </p>
          )}

          <div className="flex items-center text-muted-foreground">
            <span>Type:</span>
            <span className="ml-2 font-medium capitalize">
              {product.productType}
            </span>
          </div>

          {TRIAL_DAYS > 0 && (
            <div className="flex items-center text-muted-foreground">
              <span>Trial Period:</span>
              <span className="ml-2 font-medium">{TRIAL_DAYS}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => {
            if (
              !subscription.data ||
              subscription.data?.status === "incomplete"
            ) {
              goToCheckout.mutate(
                product.productName as (typeof STRIPE_PLAN_NAMES)[number]
              );
            } else {
              goToPortal.mutate();
            }
          }}
        >
          <ShoppingCartIcon className="w-4 h-4 mr-2" />
          Subscribe Now
        </Button>
      </CardFooter>
    </Card>
  );
};
