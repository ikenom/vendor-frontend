import { Printer } from "@ionic-native/star-prnt/ngx";
import { Order } from "../models/orders";
import { Emulation, StarPRNT } from '@ionic-native/star-prnt/ngx';
import { Filesystem, Directory} from '@capacitor/filesystem';
import { Toast } from '@capacitor/toast';
import html2canvas from "html2canvas";
import { createState, State } from "@hookstate/core";
import { ThemeProvider } from "styled-components";

export default class PrinterStore {
  private static instance: PrinterStore;

  private printerClient: StarPRNT;
  private printer: Printer | undefined;
  private isConnected: State<boolean>;
  private isEnabled: State<boolean>;
  private isAttemptingToConnect: State<boolean>;
  private isAttemptingToPrint: State<boolean>;

  public static getInstance(): PrinterStore {
    if (!PrinterStore.instance) {
      PrinterStore.instance = new PrinterStore();
    }
    return PrinterStore.instance
  }

  private constructor() {
    this.isConnected = createState<boolean>(false);
    this.isEnabled = createState<boolean>(false);
    this.isAttemptingToConnect = createState<boolean>(false);
    this.isAttemptingToPrint = createState<boolean>(false);
  }

  static init = async () => {
    const store = PrinterStore.getInstance()
  }

  connectToPrinter = async () => {
    if(!this.isEnabled.get()) {
      return;
    }

    try {
      console.log("Attempting to connect to printer ...")
      this.isAttemptingToConnect.set(true);
      const printerClient = new StarPRNT();
      const printers = await printerClient.portDiscovery("LAN");

      if(printers.length == 0) {
        console.log("No printers found")
        await Toast.show({ text: "Failed to connect to printer, no printer found", duration: 'long'})
        this.isConnected.set(false);
        this.isEnabled.set(false);
        this.isAttemptingToConnect.set(false);
      } else {
        const printer = printers.filter(printer => printer.modelName.includes('TSP143IIIW'))[0];

        this.printer = printer;
        this.printerClient = printerClient;

        this.isConnected.set(true);
        this.isEnabled.set(true);
        this.isAttemptingToConnect.set(false);
        console.log(`Connected to Printer: ${printer.modelName}`)
        await Toast.show({ text: `Connected to printer: ${printer.modelName}!`, duration: 'long'})

        this.printerClient.getStatus().subscribe(
          (value) => {console.log(`Printer status: ${JSON.stringify(value)}`)},
          (err) => {console.log(`Printer status error ${err}`)}
        )

      }

    } catch(err) {
      console.log(`Error when connecting to printer ${err.message}`)
      await Toast.show({ text: `Failed to connect to printer due to error ${err.message}`, duration: 'long'})
      this.isConnected.set(false);
      this.isEnabled.set(false);
      this.isAttemptingToConnect.set(false);
    }
  }

  printOrderInKitchen = async (order: Order) => {
    console.log(`Attempting to print order: ${order.orderNumber}`)
    try{
      const printedTicketElement = document.getElementById('receipt-paper');

      if(!printedTicketElement) {
        console.log(`Receipt component is not rendered on DOM. Unable to find component to convert to image`);
        throw ReferenceError;
      }

      this.isAttemptingToPrint.set(true);

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

      this.isAttemptingToPrint.set(false);

      const uri = (await Filesystem.getUri({path, directory})).uri
      console.log(`Receipt uri is ${uri}`)

      await this.printerClient.printImage(this.printer.portName, Emulation.StarGraphic, {uri})
      await Filesystem.deleteFile({path})
    } catch(e) {
      this.isAttemptingToPrint.set(false)
      console.log(`Failed to send message to printer ${this.printer.portName} because ${e}`)
      throw e
    }
  }

  enablePrinter = async () => {
    this.isEnabled.set(true);
    await this.connectToPrinter();
  }

  disablePrinter = () => {
    this.isEnabled.set(false);
  }

  getPrinterClient = () => this.printerClient;

  getPrinter = (): Printer | undefined => this.printer;

  getIsEnabled = () => this.isEnabled;

  getIsAttemptingConnection = ()=> this.isAttemptingToConnect;

  getIsAttemptingToPrint = () => this.isAttemptingToPrint;
}