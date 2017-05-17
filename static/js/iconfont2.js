;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-shouji" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M684.231643 861.770152l-387.921054 0c-29.53671 0-53.565986-24.029276-53.565986-53.56701L242.744603 204.228381c0-29.53671 24.030299-53.56701 53.565986-53.56701l387.921054 0c29.53671 0 53.565986 24.029276 53.565986 53.56701l0 603.974761C737.797629 837.739852 713.76733 861.770152 684.231643 861.770152zM296.310589 199.781092c-2.451842 0-4.447289 1.995447-4.447289 4.448312l0 603.974761c0 2.451842 1.995447 4.448312 4.447289 4.448312l387.921054 0c2.451842 0 4.447289-1.995447 4.447289-4.448312L688.678932 204.228381c0-2.451842-1.995447-4.448312-4.447289-4.448312L296.310589 199.780069z"  ></path>' +
    '' +
    '<path d="M490.271116 759.477394m-31.722492 0a31 31 0 1 0 63.444984 0 31 31 0 1 0-63.444984 0Z"  ></path>' +
    '' +
    '<path d="M700.31597 702.43012l-420.091754 0c-13.563924 0-24.559349-10.995425-24.559349-24.559349s10.995425-24.559349 24.559349-24.559349l420.091754 0c13.563924 0 24.559349 10.995425 24.559349 24.559349S713.879893 702.43012 700.31597 702.43012z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-user" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M637.953132 548.278251c71.730695-40.298821 120.348995-116.815519 120.348995-204.542536 0-129.46256-105.705484-234.781234-235.641835-234.781234-129.936351 0-235.628532 105.318674-235.628532 234.781234 0 84.393085 45.041846 158.307516 112.302739 199.683878-152.041812 47.787376-262.605953 189.523471-262.605953 356.600721 0 5.058203 0.560772 9.956769 0.762363 14.97404l52.356438 0c-0.230244-4.986571-0.76134-9.914814-0.76134-14.97404 0-177.279612 144.855132-321.502341 322.909387-321.502341 178.054255 0 322.910411 144.222729 322.910411 321.502341 0 5.058203-0.532119 9.987468-0.775666 14.97404l52.371788 0c0.200568-5.016247 0.760317-9.914814 0.760317-14.97404C887.263268 737.931682 783.009855 600.017636 637.953132 548.278251zM339.389222 343.735715c0-100.588953 82.208327-182.423773 183.27107-182.423773 101.06479 0 183.272094 81.83482 183.272094 182.423773 0 100.589976-82.207303 182.423773-183.272094 182.423773C421.597549 526.159488 339.389222 444.325691 339.389222 343.735715z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-yanzhengyanzhengma" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M943.1 172c-2.4-0.2-245.1-25.3-413.8-147.8-5.1-3.7-11-5.6-17.3-5.6-6.2 0-12.2 1.9-17.3 5.6C326.9 146 83.3 171.8 80.9 172c-15.2 1.4-26.6 14.1-26.6 29.3 0 6.7 0.6 165.8 54.8 344.4 32.1 105.8 76.4 196.4 131.9 269.2 70.3 92.3 158.5 156 262 189.2 2.9 0.9 5.9 1.4 9 1.4s6.1-0.5 8.9-1.4c103.6-33.2 191.7-96.8 262-189.2 55.4-72.7 99.8-163.2 131.9-269.2 54.1-178.6 54.8-337.7 54.8-344.4C969.7 186.1 958.3 173.5 943.1 172zM910.1 227.2l-0.1 1.6c-2.9 58.1-13.4 174.4-51.4 299.9-66.7 220.1-183.1 360.1-346 416.1L512 945l-0.6-0.2C349 888.9 232.7 749.4 165.8 530.1c-39.8-130.5-49.4-254.2-51.8-301.4l-0.1-1.6 1.5-0.2c70.6-10.3 250.5-44.8 395.5-142.4l0.9-0.7 1 0.7C658 182.1 837.9 216.6 908.5 227L910.1 227.2z"  ></path>' +
    '' +
    '<path d="M641.8 351 467 580.3l-89-76.1c-5.3-4.5-12.1-7-19.1-7-8.6 0-16.8 3.7-22.4 10.3-10.5 12.3-9.1 31 3.3 41.5l112.7 96.4c5.2 4.4 12.4 7 19.6 7 0.9 0 1.8 0 2.7-0.1 8-0.8 15.4-5 20.3-11.4l193.7-254c4.8-6.3 6.8-14 5.7-21.8-1-7.8-5.1-14.7-11.3-19.5C670.1 335.6 651.6 338.1 641.8 351z"  ></path>' +
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