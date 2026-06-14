abstract class Client {
  constructor(
    protected name: string,
    protected address: string,
    protected number: string,
  ) {}
}

export class Resident extends Client {
  constructor(
    name: string,
    address: string,
    number: string,
    readonly insuranceClass: string,
  ) {
    super(name, address, number);
    this.insuranceClass = insuranceClass;
  }

  getName(): string {
    return this.name;
  }
}

export class Company extends Client {
  constructor(
    name: string,
    address: string,
    number: string,
    readonly nbrOfEmployees: number,
  ) {
    super(name, address, number);
    this.nbrOfEmployees = nbrOfEmployees;
  }
}

export class Bank extends Client {
  constructor(
    name: string,
    address: string,
    number: string,
    readonly branchesInsured: number,
  ) {
    super(name, address, number);
    this.branchesInsured = branchesInsured;
  }
}

export class Restaurant extends Client {
  constructor(
    name: string,
    address: string,
    number: string,
    readonly availableAbroad: boolean,
  ) {
    super(name, address, number);
    this.availableAbroad = availableAbroad;
  }
}
