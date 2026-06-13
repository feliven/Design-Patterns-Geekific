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
    protected number: string,
  ) {}

  abstract accept(visitor: Visitor): void;
}

class Bank extends Client {
  constructor(
    name: string,
    address: string,
    number: string,
    private branchesInsured: number,
  ) {
    super(name, address, number);
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
    number: string,
    private availableAbroad: boolean,
  ) {
    super(name, address, number);
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
    number: string,
    private insuranceClass: string,
  ) {
    super(name, address, number);
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
    number: string,
    private nbrOfEmployees: number,
  ) {
    super(name, address, number);
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

  visitBank(bank: Bank): void {
    console.log("Sending mail about theft insurance...");
  }

  visitResident(resident: Resident): void {
    console.log("Sending mail about medical insurance...");
  }

  visitRestaurant(restaurant: Restaurant): void {
    console.log("Sending mail about fire and food insurance...");
  }

  visitCompany() {
    console.log("Sending employees and equipment insurance mail...");
  }
}
