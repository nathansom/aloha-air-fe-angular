import {
  LiveAnnouncer
} from '@angular/cdk/a11y';
import {
  AfterViewInit,
  OnInit,
  Component,
  ViewChild
} from '@angular/core';
import {
  MatSort,
  Sort
} from '@angular/material/sort';
import {
  MatTableDataSource
} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {
  Flight
} from '../flight.model';
import { FlightsService } from '../flights.service';

/**
 * @title Table with sorting
 */
@Component({
  selector: 'app-flights-table',
  styleUrls: ['./flights-table.component.scss'],
  templateUrl: './flights-table.component.html',
})
export class FlightsTableComponent implements OnInit {
  flightsData: Flight[] = [];
  selectedOrigin: any = '';
  selectedDestination: any = '';
  selectedDate: any = '';

  origins: any;
  destinations: any;

  displayedColumns = [
    'flightnumber',
    'origin',
    'arrive',
    'destination',
    'depart',
    'nonstop',
  ];

  dataSource = new MatTableDataSource<Flight>();

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private flightsServices: FlightsService
  ) {}

  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.flightsServices.getFlights().subscribe((data) => {
      this.dataSource = new MatTableDataSource<Flight>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.flightsServices.getOrigins().subscribe((data) => {
      this.origins = data;
    });

    this.flightsServices.getDestinations().subscribe((data) => {
      this.destinations = data;
    });

    this.displayedColumns = [
      'flightnumber',
      'origin',
      'arrive',
      'destination',
      'depart',
      'nonstop',
    ];
  }

  query(): void {
    const origin = this.selectedOrigin;
    const destination = this.selectedDestination;
    const date = this.selectedDate;

    this.flightsServices.getFlight(origin, destination).subscribe((data) => {
      this.dataSource = new MatTableDataSource<Flight>(data);
    });
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
