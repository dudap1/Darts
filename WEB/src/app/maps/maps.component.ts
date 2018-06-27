import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Place } from "../shared/dtos";
import { Router, RouterLink } from "@angular/router";
import { UserService } from "../user.service";

declare const google: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit, OnChanges {
  location: Coordinates;
  positionMarker;
  shopMarkers: any[] = [];
  map;
  searchValue;
  mapsEventListener;

  @Input() searchAvailable: boolean = true;
  @Input() dragAvailable: boolean = true;
  @Input() customLocation: any;
  @Output() locationChanged: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(private http: HttpClient, private router: Router, private UserService: UserService) {
  }

  ngOnInit() {
    const myLatlng = !this.customLocation ?
      (this.UserService.location ? this.UserService.location : new google.maps.LatLng(52, 21)) :
      this.customLocation;

    const mapOptions = {
      zoom: 15,
      center: myLatlng,
      scrollwheel: false,
      styles: [{
        "featureType": "poi",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "poi.park",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "poi.sports_complex",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "poi.medical",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "poi.business",
        "stylers": [{
          "visibility": "off"
        }]
      }]
    };
    this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    this.map.setCenter(myLatlng);

    if (!this.customLocation) {
      this.defineLocation();
    } else {
      this.setMarker(this.customLocation, "Lokalizacja");
    }


  }

  private defineLocation() {
    if (navigator.geolocation && !this.UserService.location) {
      navigator.geolocation.getCurrentPosition(position => {
        this.location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.UserService.location = this.location;
        this.setMarker(this.location, "Twoja lokalizacja", "To jest twoja lokalizacja ");
      });
    } else {
      this.location = this.UserService.location;
      this.setMarker(this.location, "Twoja lokalizacja", "To jest twoja lokalizacja");
    }
  }

  private getAddress(latLng) {
    this.locationChanged.emit(latLng);
    new google.maps.Geocoder().geocode({'location': {lat: latLng.lat(), lng: latLng.lng()}},
      (result, status) => {
        if (status === 'OK') {
          this.searchValue = result[0].formatted_address;
          this.searchInput.nativeElement.value = this.searchValue;
        }
      });
  }

  private setMarker(latLng, title, info?) {
    this.map.setCenter(latLng);

    if (this.positionMarker) {
      this.positionMarker.setMap(null);
    }

    this.positionMarker = new google.maps.Marker({
      position: latLng,
      title: title,
      draggable: this.dragAvailable
    });

    if (this.dragAvailable) {
      this.mapsEventListener = google.maps.event.addListener(this.positionMarker, 'dragend',
        (event) => this.getAddress(event.latLng));
    }

    if (info) {
      let infoWindow = new google.maps.InfoWindow({
        content: info
      });
      this.positionMarker.addListener('click', () => infoWindow.open(this.map, this.positionMarker));
    }

    this.positionMarker.setMap(this.map);
    this.getAddress(latLng);
  }

  private search() {
    new google.maps.Geocoder().geocode({'address': this.searchValue}, (result, status) => {
      if (status == 'OK') {
        this.searchValue = result[0].formatted_address;
        this.map.setCenter(result[0].geometry.location);
        this.setMarker(result[0].geometry.location, this.searchValue);
      }
    });
    //this.addMarker();
  }

  route(num: number) {
    this.router.navigate(["/shop", num]);
  }

  private addMarker(place: Place) {
    const infowindow = new google.maps.InfoWindow({
      content: "<a href='javascript:void(0)' id='marker_" + place.id + "'>" + place.name + "</a>" +
      "<table><tr><td>Typ</td><td>" + place.type + "</td></tr>" +
      "<tr><td>godziny otwarcia:</td><td>" + place.openingTime + "-" + place.closingTime + "</td></tr></table>"
    });

    google.maps.event.addListenerOnce(infowindow, 'domready', () => {
      document.getElementById(`marker_${place.id}`).addEventListener('click', () => {
        this.route(place.id);
      });
    });

    const image = '../assets/img/store.png';
    const marker = new google.maps.Marker({
      position: {lat: place.latitude, lng: place.longitude},
      map: this.map,
      icon: image,
      clickable: true,
      title: "HoverText"
    });
    marker.addListener('click', () => {
      infowindow.open(this.map, marker);
    });

    this.shopMarkers.push(marker);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.map) {
      this.setMarker(this.customLocation, "Lokalizacja");
    }
  }
}
