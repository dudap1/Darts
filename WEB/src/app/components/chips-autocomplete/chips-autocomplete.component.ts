import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { UserService } from "../../user.service";

@Component({
  selector: 'app-chips-autocomplete',
  templateUrl: './chips-autocomplete.component.html',
  styleUrls: ['./chips-autocomplete.component.scss']
})
export class ChipsAutocompleteComponent implements OnInit {
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = false;

  separatorKeysCodes = [ENTER, COMMA];

  chipCtrl = new FormControl();

  filteredChips: Observable<any[]>;

  allChips: string[] = [];
  @Input() selectedChips: string[] = [];

  @Output() selectedChipsChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  chips: string[] = [];

  @ViewChild('chipInput') chipInput: ElementRef;

  constructor(private http: HttpClient, private serv: UserService) {
    this.allChips = serv.chips;
    console.log(serv.chips);
    this.filteredChips = this.chipCtrl.valueChanges.pipe(
      startWith(null),
      map((chip: string | null) => chip ? this.filter(chip) : this.withoutSelected().slice()));
  }

  private withoutSelected(): string[] {
    return this.allChips.filter(chip => !this.chips.includes(chip.toLowerCase()));
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()/* && this.filter(value).length == 1*/) {
      this.chips.push(value);
      this.selectedChipsChange.emit(this.chips);
    }

    if (input) {
      input.value = '';
    }

    this.chipCtrl.setValue(null);
  }

  remove(chip: any): void {
    const index = this.chips.indexOf(chip);

    if (index >= 0) {
      this.chips.splice(index, 1);
      this.selectedChipsChange.emit(this.chips);
    }
  }

  filter(name: string): string[] {
    return this.withoutSelected().filter(chip =>
      chip.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.chips.push(event.option.viewValue);
    this.chipInput.nativeElement.value = '';
    this.chipCtrl.setValue(null);
    this.selectedChipsChange.emit(this.chips);
  }

  ngOnInit(): void {
    this.chips = this.selectedChips ? this.selectedChips : [];
  }
}
