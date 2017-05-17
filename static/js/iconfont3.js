;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-mulu" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M103.053241 264.933517l49.399172 0c17.319724 0 31.355586-15.872 31.355586-45.144276 0-29.289931-14.018207-43.590621-31.355586-43.590621L103.053241 176.198621c-17.319724 0-31.355586 14.30069-31.355586 43.590621C71.697655 249.061517 85.715862 264.933517 103.053241 264.933517zM329.074759 264.933517l583.115034 0c22.174897 0 40.112552-15.872 40.112552-45.144276 0-29.289931-17.95531-43.590621-40.112552-43.590621L329.074759 176.198621c-22.157241 0-40.112552 14.30069-40.112552 43.590621C288.962207 249.061517 306.899862 264.933517 329.074759 264.933517zM154.394483 492.279172l-52.082759 0c-16.260414 0-29.431172 17.496276-29.431172 43.378759 0 25.935448 13.170759 46.062345 29.431172 46.062345l52.082759 0c16.260414 0 33.809655-20.144552 33.809655-46.062345C188.204138 509.793103 170.654897 492.279172 154.394483 492.279172zM912.189793 492.279172 329.074759 492.279172c-22.157241 0-40.112552 17.496276-40.112552 43.378759 0 25.935448 17.95531 46.062345 40.112552 46.062345l583.115034 0c22.174897 0 40.112552-20.144552 40.112552-46.062345C952.302345 509.793103 934.36469 492.279172 912.189793 492.279172zM155.365517 774.338207 105.207172 774.338207c-15.730759 0-28.460138 17.584552-28.460138 43.449379s12.729379 47.65131 28.460138 47.65131L155.365517 865.438897c15.730759 0 32.820966-21.786483 32.820966-47.65131S171.096276 774.338207 155.365517 774.338207zM912.189793 774.338207 329.074759 774.338207c-22.157241 0-40.112552 17.584552-40.112552 43.449379s17.95531 46.415448 40.112552 46.415448l583.115034 0c22.174897 0 40.112552-20.550621 40.112552-46.415448S934.36469 774.338207 912.189793 774.338207z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-arrow121112" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M896.767735 959.469288 191.902146 959.469288l0-319.803653L896.767735 639.665635 896.767735 959.469288zM832.804958 639.666658 255.862877 639.666658l0 255.842922 576.942081 0L832.804958 639.666658z"  ></path>' +
    '' +
    '<path d="M511.705799 383.823736l63.960731 0 0 383.76336-63.960731 0 0-383.76336Z"  ></path>' +
    '' +
    '<path d="M191.90317 383.823736 191.90317 383.823736 191.90317 383.823736 191.90317 383.823736 191.90317 383.823736 191.90317 383.823736Z"  ></path>' +
    '' +
    '<path d="M580.415694 383.823736 703.586968 383.823736 539.059797 191.941544 383.784338 383.823736 424.281681 383.823736Z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)