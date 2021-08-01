import { Printer } from "@ionic-native/star-prnt/ngx";
import { Order } from "../models/orders";
import { Observable } from 'rxjs';
import { Emulation, StarPRNT } from '@ionic-native/star-prnt/ngx';

export default class PrinterStore {
  private static instance: PrinterStore;

  private printerClient: StarPRNT;
  private printer: Printer | undefined;
  private isConnected: boolean;
  private isEnabled: boolean;

  public static getInstance(): PrinterStore {
    if (!PrinterStore.instance) {
      PrinterStore.instance = new PrinterStore();
    }
    return PrinterStore.instance
  }

  private constructor() {
    this.isConnected = false;
    this.isEnabled = false;
  }

  static init = async () => {
    const store = PrinterStore.getInstance()
    if (!store.isConnected) {
      console.log("Attempting to connect to printer ...")
      await store.connectToPrinter();
    }
  }

  connectToPrinter = async () => {
    const printerClient = new StarPRNT();
    const printers = await printerClient.portDiscovery("LAN");

    if(printers.length == 0) {
      console.log("No printers found")
    } else {
      const printer = printers.filter(printer => printer.modelName.includes('TSP143IIIW'))[0];

      this.printer = printer;
      this.printerClient = printerClient;

      this.isConnected = true;
      console.log(`Connected to Printer: ${printer.modelName}`)

      this.printerClient.getStatus().subscribe(
        (value) => {console.log(`Printer status: ${JSON.stringify(value)}`)},
        (err) => {console.log(`Printer status error ${err}`)}
      )

    }
  }

  printOrderInKitchen = async (order: Order) => {
    console.log(`Attempting to print order: ${order.orderNumber}`)
    try{
      console.log(`Printer client is: ${this.printerClient}`)
      await this.printerClient.printRasterReceipt(this.printer.portName, Emulation.StarGraphic, { text: JSON.stringify(order)})
    } catch(e) {
      console.log(`Failed to send message to printer ${this.printer.portName} because ${e}`)
      throw e
    }
  }

  enablePrinter = () => {
    this.isEnabled = true;
  }

  disablePrinter = () => {
    this.isEnabled = false;
  }

  getPrinterClient = () => this.printerClient;
  getPrinter = () => this.printer;
  
  getIsEnabled = () => this.isEnabled;

  private formatKitchenOrder = (order: Order): string => {
    // Convert dto into printer receipt format
    return "";
  }
}