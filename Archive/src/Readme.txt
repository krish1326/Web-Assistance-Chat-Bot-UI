The way Image is zoomed to a particular point:

1. zoom the image to a percentage that is higher than the initial image.

2. translate the window scroll position using javascript so that,
 the required position is focussed on the viewport for the user

The following are the configurations that are callback functions executed when user tried
to move to a particular Location.

// setStyles refer to a function which sets styles on image element in the document.

"Flow Facial Recognition": () => {
      this.setStyles({ transform: "scale(2)", zoom: "0%" });
      window.scrollTo({ top: 0.3 * document.body.scrollHeight, left: 0, behavior: "smooth" });
    },
    "Flow start": () => {
      this.setStyles({ transform: "scaleX(1.3) scaleY(2)", zoom: "0%" })
      window.scrollTo({ top: 0.02 * document.body.scrollHeight, left: 0, behavior: "smooth" });
    },
    "Flow Manual Authentication": () => {
      this.setStyles({ transform: "scale(2)", zoom: "0%" });
      window.scrollTo({ top: 0.02 * document.body.scrollHeight, left: 0, behavior: "smooth" });
    },
    "Location QR Code": () => {
      this.setStyles({ transform: "scale(2)", zoom: "0%" });
      window.scrollTo({ top: 0.17 * document.body.scrollHeight, behavior: "smooth" })
    },
    "QUIT": () => {
      this.setStyles({ height: "100vh", width: "auto", transform: "scale(1)", zoom: "0%" })
      window.scrollTo({ top: 0, behavior: "smooth" })
      this.setState({ isImageZoomed: false });
    },
    "ICOUNT": () => {
      this.setStyles({ transform: "scale(1)", zoom: "400%" });
      window.scrollTo({
        left: 0.5 * document.body.scrollWidth,
        top: 0.15 * document.body.scrollHeight, behavior: "smooth"
      })
    },
    "ICHECK POINT SETUP": () => {
      this.setStyles({ transform: "scale(1)", zoom: "300%" });
      window.scrollTo({
        left: 0.05 * document.body.scrollWidth,
        top: 0.05 * document.body.scrollHeight
      })
    },
    "EMPLOYEE STATUS": () => {
      this.setStyles({ transform: "scale(1)", zoom: "400%" })
      window.scrollTo({
        left: 0.28 * document.body.scrollWidth,
        top: 0.14 * document.body.scrollHeight
      })
    },
    "TEMPERATURE SETUP": () => {
      this.setStyles({ transform: "scale(1)", zoom: "400%" })
      window.scrollTo({
        left: 0.22 * document.body.scrollWidth,
        top: 0.15 * document.body.scrollHeight
      })
    },
    "SEND DATA": () => {
      this.setStyles({ transform: "scale(1)", zoom: "400%" })
      window.scrollTo({
        left: 0.4 * document.body.scrollWidth,
        top: 0.12 * document.body.scrollHeight
      })
    },
    "ENTRY STATUS": () => {
      this.setStyles({ transform: "scale(1)", zoom: "300%" });
      window.scrollTo({
        left: 0 * document.body.scrollWidth,
        top: 0.04 * document.body.scrollHeight
      })
    },
    "SHARE DATA REQUESTS": () => {
      this.setStyles({ transform: "scale(1)", zoom: "400%" });
      window.scrollTo({
        left: 0.3 * document.body.scrollWidth,
        top: 0.02 * document.body.scrollHeight, behavior: "smooth"
      })
    },
    "SELECT REQUESTS": () => {
      this.setStyles({ transform: "scale(1)", zoom: "400%" });
      window.scrollTo({
        left: 0.4 * document.body.scrollWidth,
        top: 0.02 * document.body.scrollHeight, behavior: "smooth"
      })
    },
    "ALLOW AUTHENTICATION": () => {
      this.setStyles({ transform: "scale(1)", zoom: "400%" })
      window.scrollTo({
        left: 0.3 * document.body.scrollWidth,
        top: 0.5 * document.body.scrollHeight
      })
    },
    "AUTHENTICATE ID": () => {
      this.setStyles({ transform: "scale(1)", zoom: "400%" })
      window.scrollTo({
        left: 0.4 * document.body.scrollWidth,
        top: 0.5 * document.body.scrollHeight
      })
    }