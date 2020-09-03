import React from "react"

export default function Footer() {
    return (
      <footer class="footer has-text-centered">
        <div class="container">
          <div class="columns">
            <div class="column">
              <a href="http://www.uflib.ufl.edu/">
                <span class="icon">
                  <i class="fas fa-home"></i>&nbsp;
                </span>
                Library Home
              </a>
            </div>
            <div class="column">
              <a href="http://www.uflib.ufl.edu/ps/hours/">
                <span class="icon">
                  <i class="fas fa-calendar"></i>&nbsp;
                </span>
                Library Hours
              </a>
            </div>
          </div>
        </div>
      </footer>
    )
}