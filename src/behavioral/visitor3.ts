interface Visitor {
  visitBank(bank: Bank): void;
  visitRestaurant(restaurant: Restaurant): void;
  visitResident(resident: Resident): void;
  visitCompany(company: Company): void;
}

abstract class Client {
  constructor(
    protected name: string,
    protected address: string,
    protected addressNumber: number,
  ) {}

  abstract accept(visitor: Visitor): void;
}

class Bank extends Client {
  constructor(
    name: string,
    address: string,
    addressNumber: number,
    readonly branchesInsured: number,
  ) {
    super(name, address, addressNumber);
    this.branchesInsured = branchesInsured;
  }

  accept(visitor: Visitor): void {
    visitor.visitBank(this);
  }
}

class Restaurant extends Client {
  constructor(
    name: string,
    address: string,
    addressNumber: number,
    readonly availableAbroad: boolean,
  ) {
    super(name, address, addressNumber);
    this.availableAbroad = availableAbroad;
  }

  accept(visitor: Visitor): void {
    visitor.visitRestaurant(this);
  }
}

class Resident extends Client {
  constructor(
    name: string,
    address: string,
    addressNumber: number,
    readonly insuranceClass: string,
  ) {
    super(name, address, addressNumber);
    this.insuranceClass = insuranceClass;
  }

  accept(visitor: Visitor): void {
    visitor.visitResident(this);
  }
}

class Company extends Client {
  constructor(
    name: string,
    address: string,
    addressNumber: number,
    readonly nbrOfEmployees: number,
  ) {
    super(name, address, addressNumber);
    this.nbrOfEmployees = nbrOfEmployees;
  }

  accept(visitor: Visitor): void {
    visitor.visitCompany(this);
  }
}

class InsuranceMessagingVisitor implements Visitor {
  sendInsuranceMails(clients: Client[]): void {
    for (const client of clients) {
      client.accept(this);
    }
  }

  visitBank(_bank: Bank): void {
    console.log("Sending mail about theft insurance...");
  }

  visitResident(_resident: Resident): void {
    console.log("Sending mail about medical insurance...");
  }

  visitRestaurant(_restaurant: Restaurant): void {
    console.log("Sending mail about fire and food insurance...");
  }

  visitCompany(_company: Company): void {
    console.log("Sending employees and equipment insurance mail...");
  }
}

const visitor = new InsuranceMessagingVisitor();
const bank = new Bank("Banco", "Rua Avenida", 123, 23);
bank.accept(visitor);
