import { Embed } from "../components/Embed";
import { TextFx } from "../components/TextFx";
import { tween } from "../components/Reveal";
import "./Footer.css";

export function Footer() {
  return (
    <div className="footer-footer">
      <div className="footer-box">
        <div className="footer-box-2" data-fx="footer" />
        <div className="footer-box-3">
          <div className="footer-box-4">
            <TextFx className="footer-box-5" as="div" tokenization="line" transition={{ ...tween(0.4), delay: 0.075 }} target="footer">
              <p className="footer-p">{"A record of what went live, when and where "}</p>
              <p className="footer-p-2">{"readers saw it."}</p>
            </TextFx>
          </div>
          <div className="footer-box-6">
            <div className="footer-box-7">
              <TextFx className="footer-india" as="div" tokenization="line" transition={{ ...tween(0.4), delay: 0.075 }} target="footer">
                <p className="footer-p-3">{"Build"}</p>
              </TextFx>
              <div className="footer-box-8">
                <div className="footer-link-click-to-go-to-contact" data-name="Link - Click to go to contact page">
                  <div className="footer-slot">
                    <div className="footer-box-9">
                      <div className="footer-box-10">
                        <p className="footer-p-4">{"Docs"}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="footer-box-11" data-name="Link - Click to go to Podium's LinkedIn profile">
                  <div className="footer-slot-2">
                    <div className="footer-box-12">
                      <div className="footer-box-13">
                        <p className="footer-p-5">{"Blog"}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="footer-box-14" data-name="Link - Click to go to Terms and Conditions page">
                  <div className="footer-slot-3">
                    <div className="footer-box-15">
                      <div className="footer-box-16">
                        <p className="footer-p-6">{"Build log"}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="footer-box-17" data-name="Link - Click to go to Privacy Policy page">
                  <div className="footer-slot-4">
                    <div className="footer-box-18">
                      <div className="footer-box-19">
                        <p className="footer-p-7">{"Source code"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-box-20">
              <div className="footer-box-21">
                <div className="footer-box-22">
                  <TextFx className="footer-india-2" as="div" tokenization="line" transition={{ ...tween(0.4), delay: 0.075 }} target="footer">
                    <p className="footer-p-8">{"Product"}</p>
                  </TextFx>
                </div>
                <div className="footer-box-23">
                  <div className="footer-box-24">
                    <TextFx className="footer-91-74678-69399" as="div" tokenization="line" transition={{ ...tween(0.4), delay: 0.075 }} target="footer">
                      <p className="footer-p-9">{"Features"}</p>
                    </TextFx>
                    <TextFx className="footer-connect-infoesearch-com" as="div" tokenization="line" transition={{ ...tween(0.4), delay: 0.075 }} target="footer">
                      <p className="footer-p-10">{"Quick start"}</p>
                    </TextFx>
                  </div>
                </div>
              </div>
              <div className="footer-box-25">
                <div className="footer-box-26">
                  <TextFx className="footer-usa" as="div" tokenization="line" transition={{ ...tween(0.4), delay: 0.075 }} target="footer">
                    <p className="footer-p-11"><span className="footer-span">{"Project"}</span></p>
                  </TextFx>
                </div>
                <div className="footer-box-27">
                  <div className="footer-box-28">
                    <TextFx className="footer-1-248-690-2217" as="div" tokenization="line" transition={{ ...tween(0.4), delay: 0.075 }} target="footer">
                      <p className="footer-p-12">{"GitHub"}</p>
                    </TextFx>
                    <TextFx className="footer-sales-infoesearch-com" as="div" tokenization="line" transition={{ ...tween(0.4), delay: 0.075 }} target="footer">
                      <p className="footer-p-13">{"Open an issue"}</p>
                    </TextFx>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-box-29">
          <div className="footer-box-30">
            <div className="footer-box-31">
              <div className="footer-box-32">
                <form className="footer-form" onSubmit={(e) => e.preventDefault()}>
                  <label className="footer-box-33">
                    <div className="footer-box-34 form-field">
                      <input className="footer-input" placeholder="Enter email address" type="text" />
                    </div>
                  </label>
                  <div className="footer-slot-5">
                    <button className="footer-button" data-name="Default" type="submit">
                      <div className="footer-box-35">
                        <div className="footer-box-36">
                          <p className="footer-p-14">{"Subscribe"}</p>
                        </div>
                        <div className="footer-box-37">
                          <div className="footer-box-38">
                            <img className="footer-img" src="/images/XxkKDiuJDVV0jKAS4a8ieVIfhak.svg" alt="" draggable={false} />
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </form>
              </div>
              <div className="footer-box-39">
                <div className="footer-follow-us-on">
                  <p className="footer-p-15">
                    <span className="footer-span-5">{"Social media"}</span>
                  </p>
                </div>
                <div className="footer-box-40">
                  <div className="footer-box-41">
                    <div className="footer-box-42">
                      <img className="footer-img-2" src="/images/P9XTH1dx9jrF8qRYkQx7mKDR84Y.svg" alt="" draggable={false} />
                    </div>
                  </div>
                  <div className="footer-box-43">
                    <div className="footer-box-44">
                      <img className="footer-img-3" src="/images/o1BU8F7MmiQbBzywDiSSNI81Bwk.svg" alt="" draggable={false} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-box-45">
              <div className="footer-box-46">
                <div className="footer-box-47">
                  <div className="footer-box-48">
                    <img className="footer-img-4" src="/images/colophon-logo-footer.svg" alt="Colophon" draggable={false} />
                  </div>
                </div>
              </div>
              <div className="footer-box-49">
                <div className="footer-box-50" />
                <div className="footer-box-51">
                  <div className="footer-paragraph">
                    <div className="footer-box-52">
                      <p className="footer-p-16">{"© 2026 Colophon · Made with Rust and Svelte"}</p>
                    </div>
                  </div>
                  <div className="footer-box-53">
                    <div className="footer-box-54" />
                    <div className="footer-link-click-here-to-open-zyps" data-name="Link - Click here to open Zypsy website">
                      <div className="footer-icon" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-box-55">
            <div className="footer-box-56">
              <div className="footer-box-57">
                <div className="footer-slot-6">
                  <Embed className="footer-iframe" src="/embeds/orbit-globe.html" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
