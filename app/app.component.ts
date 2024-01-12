import {
  Component
} from '@angular/core';

import {
  Sort
} from './sort';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  data: ExampleData[];
  sortedData: ExampleData[];

  displayedColumns = ['name', 'age', 'id'];

  ngOnInit() {
    this.update();
  }

  update() {
    this.data = [
      {
        name: 'a',
        age: Math.floor(Math.random() * 30),
        id: 'asdf'
      },
      {
        name: 'b',
        age: Math.floor(Math.random() * 30),
        id: 'qwer'
      },
    ];
    this.sortedData = this.data.slice();
  }

  sortData(sort: Sort) {

    console.log(sort);

    const data = this.data.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'age': return compare(a.age, b.age, isAsc);
        case 'id': return compare(a.id, b.id, isAsc);
        default: return 0;
      }
    });
    // }
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

interface ExampleData {
  name: string;
  age: number;
  id: string;
}
