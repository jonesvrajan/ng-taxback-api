import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Transaction } from "../models/transaction";
import { TRANSACTIONS } from "../models/mock.transactions";
import { TransactionService } from "../services/transaction.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  id: any = 1500;
  user: any = 'priya@gmail.com';
  amount: any = '22000';
  currency: any = 'INR';
  txn_date: any = '2018-10-22';

  displayedColumns = ['id', 'user', 'amount', 'currency', 'txn_date'];
  dataSource: MatTableDataSource<Transaction>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  data : any = [];
  selectedData : any = [];
  updatedData : any = [];
  txns: Transaction[];
  newTxn : Transaction[];
  selectedTransaction: Transaction;
  newTransaction: Transaction;
  transactionDetail: boolean = false;

  constructor(
    private txnService: TransactionService,
    public dialog: MatDialog
  ) {

    this.txnService.getTxns().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

    });
  }

  ngOnInit() {

  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */

  ngAfterViewInit() {
    this.txnService.getTxns().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

 

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  onSelect(row: any): void {
    this.transactionDetail = true;

    var selected = {
      id: row.id,
      user: row.user,
      amount: row.amount,
      currency: row.currency,
      txn_date: row.txn_date
    }
    

    this.selectedData.push(selected);
  }

  updateTxn () {
    var selectedID: string = '/' + this.selectedData[0].id;
    var selected = this.selectedData[0];
    this.txnService.updateTxn(selected, selectedID).subscribe(data => {
      location.reload();
    });
  }

  addTxn () {
    var txn = Transaction
  }

  cancelTxn () {
    this.transactionDetail = false;
    this.selectedData = [];
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewDialog, {
      width: '600px',
      data: {id: this.id, user: this.user, amount: this.amount, currency: this.currency, txn_date: this.txn_date}
    });

    dialogRef.afterClosed().subscribe(data => {
      this.data.push(data);
      const dataD =  this.data[0];
      this.txnService.addTxn(dataD).subscribe(res => {
        location.reload();
      })
      
    })
  }

}

@Component({
  selector: 'new-dialog',
  templateUrl: 'new-dialog.html',
})
export class NewDialog {

  constructor(
    public dialogRef: MatDialogRef<NewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Transaction) {}

  onNoClick(): void {
    this.dialogRef.close();
    
  }

}


