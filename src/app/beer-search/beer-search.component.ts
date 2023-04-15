import { Component } from '@angular/core';
import { IBeer } from '../utils/types';
import { BeerService } from '../utils/beer-service.service';

@Component({
  selector: 'beer-search',
  templateUrl: './beer-search.component.html',
  styleUrls: ['./beer-search.component.scss'],
})
export class BeerSearchComponent {
  searchTerm = '';
  timeout: any = null;
  resListIsOpen = false;
  activeBeer$?: IBeer;
  activeIndex: number = 0;
  initialBeers$: IBeer[] = [
    { id: 0, name: 'No Beer found :-(', image_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADgCAMAAADCMfHtAAAAdVBMVEX///8AAACHh4e5ubmxsbFaWlp2dnbLy8u1tbVubm56enq+vr7i4uLPz8/S0tL7+/uTk5PFxcVJSUnm5uYxMTHZ2dlCQkLt7e2fn58mJiZpaWmpqaliYmJ/f39QUFDl5eWWlpYeHh49PT0TExMoKCg2NjYQEBA9MQiTAAAE/UlEQVR4nO2baVciOxBAO4AoDKtsyqLgOP7/n/hYBHqpSqqXjPPOufdzdZJ76CSVSpMkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPCPs1oMp9Pp42Iw/umRRGC43766FM+t9upnRjJ4aguYI4dS5Ljz4CQ+JwMpfCU1/CRFzqTIx4BhRxzL3hrZK8YtemKTF+ad4gOPYuROGEJbCnyrZOiE3+ZJiuvmo4ZLj9+ZF5uh+1Ucwi8p7qGaoSuuDRbD97eQ34ncG6gYuuK8bdRwWcVwYvE7NZ4ZvGY4j2voJqUNV3Oj4JGNwdD14xq6/BoVMpza/VxmiVINXX5Nb9gwPw8Chi+lBI9v6m2m64ZuFtfwo4yhdQre+bwqegxf4xq6lt2wvOB9JfEY5vbbxg3d1GrobUVlGTZ0mQyhecPMVPQYLsxSWfphQ5dO9CIYprck3XBsNSrQDhv+jmuY3pJ0w63RR2AVNHTbuIapLUk1FPs1sg0bprKDKIb3LUk1NIjoPIYN3SKu4W1L0gzLbvVZ5gZDF9fwtiVphr5nD73JftL/8IVMDYZXiUiG1y1JMdzoD+6vb/j46Y8atDQYXs+UsQzdu8/woD2VzYjE4/mZ2dAwhFFcw4Nu2B9oD+WrBGPtXZ2MDEO4nMijGbq1arjbK48INSelvvFpMnyLa3jekkTDljJsqQCmpT62IezjGp5+EtFQSWcKp/MzyoRb24Ywimv4pRj+lsOVGrdcRlXaEBqNaXhsRzSUaSmdmWacynNcQ7cpkX4utN7sTUhMxJ2zMUO3sw9F7a1vb0NCfLw5Qzt6n3+3t3h9SlcOFwwJWml+wrBQTL5Rb6mRwZC3tAr6jZ7nqFWZSobPNTtVe+uam7APoZJhq+YvO9J6szfRN1/0VDLs1ykQOuFm+JsS11M9c3ZQ0TA52JpXwpTPLuRDsNhGL0mM15FVDWe25pWTz1bsS6lkiJPzaLiyDaGqofEo0VIu7oVPLtQRi+KnCp/tpa5saFv3dtr6Xzzkjw9y5Id4r3OuYbYsQ6huaJoHffVVyv+Kgy8l8EVMdC5V2uCnK66WoWUedBO1ErrNLDdaxeq4KonFjYuh5VarhqHlyqXrm6+966s68FwRP8ip3Hel3ZDI1jFMwofeQFXffWy7a396MvIaen77K7UMlQ0sRbduZvuspOO3C3y5epWinmFwHpyyl9dQkI9FyDA4hHqGWonzxsmwzqHv1JPfMPiRQE3D0Gck5wy0Rn1pHDYMHbnqGib+rw0vOfbBZCNwPoSEDAPHgNqG/nlwMTQmsQX2ickw8VbFaxv658H3OaladWLteThj+O5rpb6h96L+ehIsUfK/cS12hA29zTdg6JsHXW87Xm7VHIOh7xjQhKFnHtxP82W/qlnfnrQYeo4BjRiqV9npeoUeJLG/P2gy1I8BjRjq72C6IjMOJlh30rf8JkP9ONyMYaL9hyJbc7KuN73MDarNUD0ON2SoJZ+5qtrYcgX3J1dsNBpqx+GmDJV5UKgbzkLFj/k0/4jVUBlCJUOp3imvldJAfKnsWvgzjmi4LsYpeUXoX0HDXauIVClLNkKgHJkMWwdpLNuO+AXDQBrCRorsSEMo/MvoL7Fqtx7uc/dr2d+ol/v/a8azwWIx+KE/HgIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABACf4DlLJGroQ+tksAAAAASUVORK5CYII=', description: 'very nice' },
  ];
  beers$: IBeer[] = this.initialBeers$;

  constructor(public beerService: BeerService) {
    this.loadBeers();
  }

  loadBeers() {
    return this.beerService.GetAllBeers().subscribe((data: IBeer[]) => {
      this.beers$ = data;
    });
  }

  loadBeersByName(name: string) {
    return this.beerService.GetBeersByName(name).subscribe((data: IBeer[]) => {
      this.beers$ = data;

      if(data.length === 0){
        this.noBeerFound();
      }
    });
  }

  noBeerFound(){
    this.beers$ = this.initialBeers$;
    this.activeIndex = 0;
    this.activeBeer$ = this.beers$[this.activeIndex];
    this.resListIsOpen = true;
  }

  onKeydown($event: Event) {
    if (this.activeIndex < this.beers$.length - 1) {
      this.activeIndex++;
    } else {
      this.activeIndex = 0;
    }
    this.activeBeer$ = this.beers$[this.activeIndex];
  }
  onKeyup($event: Event) {
    if (this.activeIndex === 0) {
      this.activeIndex = this.beers$.length - 1;
    } else {
      this.activeIndex--;
    }
    this.activeBeer$ = this.beers$[this.activeIndex];
  }
  onEnter($event: Event) {
    this.activeBeer$ = this.beers$[this.activeIndex];
    this.searchTerm = this.activeBeer$.name;
    this.resListIsOpen = false;
  }

  onClickSelectBeer(beer: IBeer) {
    this.activeBeer$ = beer;
    this.searchTerm = beer.name;
    this.resListIsOpen = false;
  }

  search(term: string): void {
    this.searchTerm = term;
    this.activeBeer$ = this.beers$[this.activeIndex];
    this.resListIsOpen = true;

    clearTimeout(this.timeout);

    var $this = this;
    this.timeout = setTimeout(function () {
      $this.loadBeersByName($this.searchTerm);
    }, 1000);

  }
}
