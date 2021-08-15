import { Printer } from "@ionic-native/star-prnt/ngx";
import { Order } from "../models/orders";
import { Emulation, StarPRNT } from '@ionic-native/star-prnt/ngx';
import { Filesystem, Encoding, Directory} from '@capacitor/filesystem';
import html2canvas from "html2canvas";

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
      this.isConnected = false;
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
      
      
      const printedTicketElement = document.getElementById('receipt-paper');

      if(!printedTicketElement) {
        console.log(`Receipt component is not rendered on DOM. Unable to find component to convert to image`);
        throw ReferenceError;
      }

      // Convert react component to image
      const canvasElement = await html2canvas(printedTicketElement);
      const data = canvasElement.toDataURL();
      const base64Image = data.split('base64,')[1];

      const fileName = `${order.id}.jpg`;
      const path = `fytr/${fileName}`;
      const directory = Directory.Data;

      await Filesystem.writeFile({
        path,
        data: base64Image,
        directory,
        recursive: true
      });

      const uri = (await Filesystem.getUri({path, directory})).uri
      console.log(`Receipt uri is ${uri}`)

      await this.printerClient.printImage(this.printer.portName, Emulation.StarGraphic, {uri})
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
}