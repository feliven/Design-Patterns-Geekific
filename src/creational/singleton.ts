export class Singleton {
  private static instance: Singleton;
  protected data: string = "";

  private constructor(data: string) {
    this.data = data;
  }

  public static getInstance(data: string): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton(data);
    }
    return Singleton.instance;
  }
}
