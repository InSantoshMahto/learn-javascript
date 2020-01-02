/** @format */

import { Component, Renderer2, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  sources = [
    {
      src: "https://via.placeholder.com/640/0000FF/ffffff/?text=blue",
      alt: "item-1"
    },
    {
      src: "https://via.placeholder.com/640/00ff00/ffffff/?text=green",
      alt: "item-2"
    },
    {
      src: "https://via.placeholder.com/640/FF0000/ffffff/?text=red",
      alt: "item-3"
    },
    {
      src: "https://via.placeholder.com/640/FF00ff/ffffff/?text=start",
      alt: "item-4"
    },
    {
      src: "https://via.placeholder.com/640/FFff00/ffffff/?text=rock",
      alt: "item-5"
    }
  ];
  constructor(private renderer: Renderer2) {}

  ngOnInit() {
  }

  /**
   * swipeLeft
   * @param event $event
   */
  swipeLeft(event: any): any {
    console.log("left", this.sources);

    this.removeAllAnimationClasses();

    this.renderer.addClass(
      document.querySelector(".item-front"),
      "fadeInRight"
    );

    setTimeout(() => {
      this.move(this.sources, this.sources.length - 1, 0);
      this.renderer.addClass(
        document.querySelector(".item-front"),
        "fadeInRight"
      );
    }, 500);
  }

  /**
   * swipeRight
   * @param event $event
   */
  swipeRight(event: any): any {
    console.log("right", this.sources);

    this.removeAllAnimationClasses();

    this.renderer.addClass(
      document.querySelector(".item-front"),
      "fadeOutRight"
    );

    setTimeout(() => {
      this.move(this.sources, 0, this.sources.length - 1);

      this.renderer.removeClass(
        document.querySelector(".item-front"),
        "fadeOutRight"
      );
    }, 500);
  }

  /**
   * move
   * @param arr Array<any>
   * @param oldIndex number
   * @param newIndex number
   */
  move(arr: Array<any>, oldIndex: number, newIndex: number) {
    while (oldIndex < 0) {
      oldIndex += arr.length;
    }
    while (newIndex < 0) {
      newIndex += arr.length;
    }
    if (newIndex >= arr.length) {
      let k = newIndex - arr.length;
      while (k-- + 1) {
        arr.push(undefined);
      }
    }

    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    return arr;
  }

  /**
   * * remove all animation classes
   * ? Must be used renderer.
   */
  removeAllAnimationClasses() {
    const itemBack = document.querySelector(".item-back");
    const itemMiddle = document.querySelector(".item-middle");
    const itemFront = document.querySelector(".item-front");
    const itemHidden = document.querySelector(".d-none");

    this.renderer.removeClass(itemBack, "fadeInRight");
    this.renderer.removeClass(itemBack, "fadeOutRight");

    this.renderer.removeClass(itemMiddle, "fadeInRight");
    this.renderer.removeClass(itemMiddle, "fadeOutRight");

    this.renderer.removeClass(itemFront, "fadeInRight");
    this.renderer.removeClass(itemFront, "fadeOutRight");

    this.renderer.removeClass(itemHidden, "fadeInRight");
    this.renderer.removeClass(itemHidden, "fadeOutRight");
  }
}
