class CreditCard {
  private amount: number = 1000;

  constructor(
    private number: string,
    private date: string,
    private cvv: string,
  ) {
    this.number = number;
    this.date = date;
    this.cvv = cvv;
  }

  getAmount(): number {
    return this.amount;
  }

  setAmount(amount: number): void {
    this.amount = amount;
  }
}

class PaymentService {
  private cost: number = 0;
  private includeDelivery: boolean = false;

  processOrder(): void {
    // Pop-up to collect card details...
    const card = new CreditCard("cardNumber", "expiryDate", "cvv");
    // Validate credit card...
    console.log("Paying " + this.getTotal() + " using Credit Card");
    card.setAmount(card.getAmount() - this.getTotal());
  }

  private getTotal(): number {
    return this.includeDelivery ? this.cost + 10 : this.cost;
  }
}

interface PaymentStrategy {
  pay(amount: number): void;
}

class PaymentByCreditCard implements PaymentStrategy {
  private card!: CreditCard;

  pay(amount: number): void {
    // Pop-up to collect card details...
    this.card = new CreditCard("cardNumber", "expiryDate", "cvv");
    // Validate credit card...
    console.log("Paying " + amount + " using Credit Card");
    this.card.setAmount(this.card.getAmount() - amount);
  }
}

class PaymentByPayPal implements PaymentStrategy {
  private email!: string;
  private password!: string;

  pay(amount: number): void {
    // Pop-up to collect PayPal mail and password...
    this.email = "...";
    this.password = "...";
    // Validate account...
    console.log("Paying " + amount + " using PayPal");
  }
}
