class CreditCard {
  private amount: number = 1000;

  constructor(
    private number: string,
    private date: string,
    private cvv: string,
  ) {}

  getAmount(): number {
    return this.amount;
  }

  setAmount(amount: number): void {
    this.amount = amount;
  }
}

interface PaymentStrategy {
  collectPaymentDetails(...paymentDetails: unknown[]): void;
  validatePaymentDetails(): boolean;
  pay(amount: number): void;
}

class PaymentByCreditCard implements PaymentStrategy {
  private card!: CreditCard;

  collectPaymentDetails(number: string, date: string, cvv: string): void {
    // Pop-up to collect card details...
    this.card = new CreditCard(number, date, cvv);
  }

  validatePaymentDetails(): boolean {
    // Validate credit card...
    return true;
  }

  pay(amount: number): void {
    console.log("Paying " + amount + " using Credit Card");
    this.card.setAmount(this.card.getAmount() - amount);
  }
}

class PaymentByPayPal implements PaymentStrategy {
  private email: string = "";
  private password: string = "";

  collectPaymentDetails(email: string, password: string): void {
    // Pop-up to collect PayPal mail and password...
    this.email = email;
    this.password = password;
  }

  validatePaymentDetails(): boolean {
    // Validate account...
    return true;
  }

  pay(amount: number): void {
    console.log("Paying " + amount + " using PayPal");
  }
}

class PaymentService {
  private cost: number = 0;
  private includeDelivery: boolean = false;

  private strategy!: PaymentStrategy;

  setCost(cost: number) {
    this.cost = cost;
  }

  setIncludeDelivery(includeDelivery: boolean) {
    this.includeDelivery = includeDelivery;
  }

  setStrategy(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  processOrder(): void {
    this.strategy.collectPaymentDetails();
    if (this.strategy.validatePaymentDetails()) {
      this.strategy.pay(this.getTotal());
    }
  }

  private getTotal(): number {
    return this.includeDelivery ? this.cost + 10 : this.cost;
  }
}

function payOrder(): void {
  const paymentService = new PaymentService();
  // The strategy can now be easily picked at runtime
  paymentService.setStrategy(new PaymentByCreditCard());
  paymentService.setCost(50);
  paymentService.setIncludeDelivery(true);
  paymentService.processOrder();
}

payOrder();
