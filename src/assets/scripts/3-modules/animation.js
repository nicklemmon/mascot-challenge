var AtomoAnim = {
  init: function() {
    this.cacheDom();
    this.animateOrbit();
    this.animateEyes();
    this.animateBody();
    this.animateShadow();
  },
  cacheDom: function() {
    this.$atomo = $('.atomo');
    this.$atomoSmile = $('.atomo--smile');
    this.$atomoBigSmile = $('.atomo--big-smile');
    this.$orbit = $('.atomo__orbit');
    this.$proton = $('.atomo__proton');
    this.$eye = $('.atomo__eye');
    this.$face = $('.atomo__face');
    this.$shadow = $('.atomo__shadow');
    this.bodyAnimTiming = 1.5;
  },
  animateOrbit: function() {
    var tl = new TimelineMax({ repeat: -1 });

    tl.to(this.$orbit, 15, {
      rotation:360,
      transformOrigin:"51% 50%",
      ease: Linear.easeNone
    });
  },
  animateBody: function() {
    var tl = new TimelineMax({ repeat: -1 });

    tl.to(this.$face, this.bodyAnimTiming, { y: 8, scaleY: 0.97, scaleX: 1.03, transformOrigin: "bottom", ease: Power1.easeInOut  })
      .to(this.$face, this.bodyAnimTiming, { y: 0, scaleY: 1.0, scaleX: 1.0, ease: Power1.easeInOut })

    return tl;
  },
  animateShadow: function() {
    TweenMax.from(this.$shadow, this.bodyAnimTiming, { autoAlpha: 0.25, scaleX: 1.1, transformOrigin: "center", repeat: -1, yoyo: true });
  },
  animateEyes: function() {
    var tl = new TimelineMax({ repeat: -1 });

    tl.to(this.$eye, 0.25, { delay: 3, scaleY: 0.1, transformOrigin: "center", ease: Power1.easeNone })
      .to(this.$eye, 0.25, { scaleY: 1.0, transformOrigin: "center", ease: Power1.easeNone })
  },
  animateProtons: function() {
    TweenMax.staggerTo(this.$proton, 1, {scale: 1.33, repeat: -1, yoyo: true, transformOrigin: "center" }, 1);
  }
}
