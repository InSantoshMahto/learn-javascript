import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { ConfigService } from 'src/providers/config/config.service';
import { LoadingService } from 'src/providers/loading/loading.service';
import { HttpClient } from '@angular/common/http';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

declare var google;
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
  providers: [CallNumber, EmailComposer],
})
export class ContactUsPage implements OnInit {
  @ViewChild('map', { static: true }) mapElement: ElementRef;
  map: any;
  contact = {
    name: '',
    email: '',
    message: '',
  };
  errorMessage = '';

  constructor(
    public http: HttpClient,
    public config: ConfigService,
    public loading: LoadingService,
    public shared: SharedDataService,
    private callNumber: CallNumber,
    private emailComposer: EmailComposer
  ) {}

  // <!-- 2.0 updates -->
  submit() {
    this.loading.autoHide(2000);
    let data = {};
    data = this.contact;
    this.http
      .get(
        this.config.url +
          '/api/appusers/send_mail/?insecure=cool&email=' +
          this.contact.email +
          '&name=' +
          this.contact.name +
          '&message=' +
          this.contact.message
      )
      .subscribe(
        (data$: any) => {
          console.log(data$);

          this.contact.name = '';
          this.contact.email = '';
          this.contact.message = '';
          this.errorMessage = data$;
        },
        (error) => {
          this.errorMessage = JSON.parse(error._body).error;
          console.log(this.errorMessage);
        }
      );
  }

  loadMap() {
    const myApiKey = this.config.googleMapId;
    const lat = parseFloat(this.config.latitude);
    const lng = parseFloat(this.config.longitude);
    const content = this.config.address;
    const parentElement = this.mapElement.nativeElement;
    const script = document.createElement('script');

    try {
      script.src = 'https://maps.googleapis.com/maps/api/js?key=' + myApiKey;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        const map = new google.maps.Map(parentElement, {
          center: { lat, lng },
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        });

        const marker = new google.maps.Marker({
          map,
          animation: google.maps.Animation.DROP,
          position: map.getCenter(),
        });

        const infoWindow = new google.maps.InfoWindow({
          content,
        });

        google.maps.event.addListener(marker, 'click', () => {
          infoWindow.open(map, marker);
        });
      };
      this.mapElement.nativeElement.insertBefore(script, null);
    } catch (error) {}
  }

  public openCaller(phoneNumber: string) {
    this.callNumber
      .callNumber(phoneNumber, true)
      .then((res: any) => console.log('Launched dialer!', res))
      .catch((err: any) => console.log('Error launching dialer', err));
  }

  public openEmail(to: string) {
    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {
        const email = {
          to,
          attachments: [],
          subject: 'Contact',
          body: '',
          isHtml: true,
        };
        // Send a text message using default options
        this.emailComposer.open(email);
      }
    });
  }

  ngOnInit() {
    if (this.config.googleMapId !== '') this.loadMap();
  }
}
