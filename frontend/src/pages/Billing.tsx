import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, CreditCard } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Billing = () => {
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Billing", path: "/billing" },
  ];

  const [billingInterval, setBillingInterval] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<"pro" | "team">("pro");

  // Features list for each plan
  const proFeatures = [
    // "up to 100 User Accounts",
    "10k MCP server Calls/Month",
    // "Unlimited access to MCP Clients",
    "Dedicated Support",
  ];

  // const teamFeatures = [
  //   "up to 500 User Accounts",
  //   "100k MCP server Calls/Month",
  //   "Unlimited access to MCP Clients",
  //   "Dedicated Support",
  // ];

  // Pricing constants
  const prices = {
    pro: {
      monthly: 6.00,
      yearly: 4.80,
      yearlyTotal: 57.60
    },
    // team: {
    //   monthly: 499.00,
    //   yearly: 399.20,
    //   yearlyTotal: 4790.40
    // }
  };

  // Generate plan details based on selected options
  const getActivePlanDetails = () => {
    // if (selectedPlan === "pro") {
      return {
        name: "Pro",
        description: "For professional developers",
        features: proFeatures,
        price: billingInterval === "monthly" 
          ? prices.pro.monthly 
          : prices.pro.yearly,
        basePrice: billingInterval === "monthly" 
          ? prices.pro.monthly 
          : prices.pro.yearlyTotal,
        interval: "per month"
      };
    // }
    // return {
    //   name: "Team",
    //   description: "The perfect plan for teams",
    //   features: teamFeatures,
    //   price: billingInterval === "monthly" 
    //     ? prices.team.monthly 
    //     : prices.team.yearly,
    //   basePrice: billingInterval === "monthly" 
    //     ? prices.team.monthly 
    //     : prices.team.yearlyTotal,
    //   interval: billingInterval === "monthly" ? "per month" : "per year"
    // };
  };

  const activePlan = getActivePlanDetails();

  const handlePaymentClick = () => {
    // In a real implementation, this would call a backend service to create a Stripe checkout session
    toast({
      title: "Processing payment",
      description: "Redirecting to payment provider...",
    });
    
    // Simulate redirect to payment provider after a short delay
    setTimeout(() => {
      window.alert("In a real implementation, this would redirect to Stripe Checkout");
    }, 1500);
  };

  return (
    <DashboardLayout>
      <Breadcrumb items={breadcrumbItems} />
      <div className="p-10">
        <div className="max-w-4xl mx-auto bg-white rounded-lg border p-8">
          <h1 className="text-2xl font-bold mb-2">Manage your Plan</h1>
          <p className="text-gray-600 mb-8">
            Below are the details of your current plan. You can change your plan or cancel your subscription at any time.
          </p>

          <div className="mb-8">
            <h2 className="font-medium mb-4">Choose your billing interval</h2>
            <RadioGroup 
              value={billingInterval} 
              onValueChange={(value: "monthly" | "yearly") => setBillingInterval(value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <label htmlFor="monthly" className="cursor-pointer">Monthly</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yearly" id="yearly" />
                <label htmlFor="yearly" className="cursor-pointer">Yearly(save 20%)</label>
              </div>
            </RadioGroup>
          </div>

          <h2 className="font-medium mb-4">Pick your preferred plan</h2>

          {/* Wrap plan selection in RadioGroup */}
          <RadioGroup
            value={selectedPlan}
            onValueChange={(value: "pro" | "team") => setSelectedPlan(value)}
            className="space-y-4 mb-8"
          >
            {/* Pro Plan */}
            <div
              className={`border rounded-md p-4 flex justify-between items-center ${
                selectedPlan === "pro" ? "border-blue-500 bg-blue-50" : ""
              }`}
              onClick={() => setSelectedPlan("pro")}
            >
              <div className="flex items-center">
                <RadioGroupItem
                  value="pro"
                  id="pro"
                  checked={selectedPlan === "pro"}
                  className="mr-3"
                  onClick={() => setSelectedPlan("pro")}
                />
                <div>
                  <h3 className="font-medium">Pro</h3>
                  <p className="text-sm text-gray-600">The perfect plan for professionals</p>
                </div>
              </div>
              <div className="text-right">
                {billingInterval === "yearly" && <span className="line-through text-gray-400">${prices.pro.monthly}</span>}
                <div className="text-xl font-bold">
                  ${billingInterval === "monthly" ? prices.pro.monthly.toFixed(2) : prices.pro.yearly.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">
                  per month
                </div>
              </div>
            </div>

            {/* Team Plan */}
            {/* <div
              className={`border rounded-md p-4 flex justify-between items-center ${
                selectedPlan === "team" ? "border-blue-500 bg-blue-50" : ""
              }`}
              onClick={() => setSelectedPlan("team")}
            >
              <div className="flex items-center">
                <RadioGroupItem
                  value="team"
                  id="team"
                  checked={selectedPlan === "team"}
                  className="mr-3"
                  onClick={() => setSelectedPlan("team")}
                />
                <div>
                  <h3 className="font-medium">Team</h3>
                  <p className="text-sm text-gray-600">The perfect plan for teams</p>
                </div>
              </div>
            </div> */}
          </RadioGroup>

          {/* Plan Details Section */}
          <div className="mb-8 ml-8">
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">
                {activePlan.name} / {billingInterval === "monthly" ? "Monthly" : "Yearly(save 20%)"}
              </h2>
              <p className="text-gray-600 mb-4">{activePlan.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Details</h3>
              <div className="flex items-center">
                <CreditCard className="w-4 h-4 mr-2" />
                <span>Base Plan ({billingInterval === "monthly" ? "Monthly" : "Yearly(save 20%)"}) - ${
                  billingInterval === "monthly" 
                    ? activePlan.basePrice.toFixed(2)
                    : activePlan.basePrice.toFixed(2)
                }</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Features</h3>
              <ul className="space-y-2">
                {activePlan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Button 
            className="bg-blue-500 hover:bg-blue-600"
            onClick={handlePaymentClick}
          >
            <span>Proceed to Payment</span>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2">
              <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Billing;