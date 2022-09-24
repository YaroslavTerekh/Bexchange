import { StateDictionary } from './../models/StateDictionary';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-content-item',
  templateUrl: './order-content-item.component.html',
  styleUrls: ['./order-content-item.component.scss']
})
export class OrderContentItemComponent implements OnInit {
  @Input() firstBook!: string;
  @Input() secondBook!: string;
  @Input() state!: string;
  @Input() id!: number;
  @Input() index!: number;
  stateDict: StateDictionary = new StateDictionary();
  stateColor: any = {
    color: '#00801c',    
  }


  constructor() { }

  ngOnInit(): void {
    let idx = 0;
    idx = this.index;
    this.state = this.stateDict.stateEnum[idx];

    if(this.state == 'Відхилено') {
      this.stateColor.color = '#CE2424';
    } 

    if(this.state == 'Очікування') {
      this.stateColor.color = '#ffc400'
    }
  }

}
