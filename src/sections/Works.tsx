import { Ticker } from "../components/Ticker";
import { TextFx } from "../components/TextFx";
import { Reveal, tween, spring } from "../components/Reveal";
import "./Works.css";

export function Works() {
  return (
    <div className="works-works-section">
      <div className="works-hero-76" data-fx="works">
        <div className="works-box">
          <div className="works-box-2">
            <div className="works-video-carousel">
              <Ticker className="works-box-3">
                {[
                  <div className="works-box-4">
                    <div className="works-box-5">
                      <div className="works-box-6">
                        <img className="works-img" src="/images/colophon/works-kiosk.webp" alt="" draggable={false} />
                      </div>
                    </div>
                    <div className="works-box-7">
                      <div className="works-box-8">
                        <img className="works-img-2" src="/images/JVwDT4x7a6KnLhr6aYs5jpOqWw.png" alt="" draggable={false} />
                      </div>
                    </div>
                  </div>,
                  <div className="works-box-9">
                    <div className="works-box-10">
                      <div className="works-box-11">
                        <img className="works-img-3" src="/images/colophon/works-book.webp" alt="" draggable={false} />
                      </div>
                    </div>
                    <div className="works-box-12">
                      <div className="works-box-13">
                        <img className="works-img-4" src="/images/JVwDT4x7a6KnLhr6aYs5jpOqWw.png" alt="" draggable={false} />
                      </div>
                    </div>
                  </div>,
                ]}
              </Ticker>
              {" "}
              <Ticker className="works-box-14" reverse>
                {[
                  <div className="works-box-15">
                    <div className="works-box-16">
                      <div className="works-box-17">
                        <img className="works-img-5" src="/images/colophon/works-editor-cap.webp" alt="" draggable={false} />
                      </div>
                    </div>
                    <div className="works-box-18">
                      <div className="works-box-19">
                        <img className="works-img-6" src="/images/colophon/works-review.webp" alt="" draggable={false} />
                      </div>
                    </div>
                  </div>,
                  <div className="works-box-20">
                    <div className="works-box-21">
                      <div className="works-box-22">
                        <img className="works-img-7" src="/images/colophon/works-street.webp" alt="" draggable={false} />
                      </div>
                    </div>
                    <div className="works-box-23">
                      <div className="works-box-24">
                        <img className="works-img-8" src="/images/FzBnCisOXfj9l9O6ytXbqU08BHs.png" alt="" draggable={false} />
                      </div>
                    </div>
                  </div>,
                  <div className="works-box-25">
                    <div className="works-box-26">
                      <div className="works-box-27">
                        <img className="works-img-9" src="/images/colophon/works-type.webp" alt="" draggable={false} />
                      </div>
                    </div>
                    <div className="works-box-28">
                      <div className="works-box-29">
                        <img className="works-img-10" src="/images/colophon/works-editor-cap.webp" alt="" draggable={false} />
                      </div>
                    </div>
                  </div>,
                ]}
              </Ticker>
              {" "}
              <Ticker className="works-box-30">
                {[
                  <div className="works-box-31">
                    <div className="works-box-32">
                      <div className="works-box-33">
                        <img className="works-img-11" src="/images/colophon/works-reader.webp" alt="" draggable={false} />
                      </div>
                    </div>
                    <div className="works-box-34">
                      <div className="works-box-35">
                        <img className="works-img-12" src="/images/JVwDT4x7a6KnLhr6aYs5jpOqWw.png" alt="" draggable={false} />
                      </div>
                    </div>
                  </div>,
                  <div className="works-box-36">
                    <div className="works-box-37">
                      <div className="works-box-38">
                        <img className="works-img-13" src="/images/colophon/works-steps.webp" alt="" draggable={false} />
                      </div>
                    </div>
                    <div className="works-box-39">
                      <div className="works-box-40">
                        <img className="works-img-14" src="/images/JVwDT4x7a6KnLhr6aYs5jpOqWw.png" alt="" draggable={false} />
                      </div>
                    </div>
                  </div>,
                ]}
              </Ticker>
              {" "}
            </div>
          </div>
        </div>
        <div className="works-box-41">
          <p className="works-p">
            <span className="works-span">{"Every release recorded, every change reviewed."}</span>
          </p>
        </div>
        <div className="works-box-42" data-border="true" />
        <div className="works-box-43" data-border="true" />
        <div className="works-box-44">
          <div className="works-box-45">
            <div className="works-box-46">
              <div className="works-box-47" />
              <TextFx className="works-ott" as="div" tokenization="line" transition={{ ...tween(0.4), delay: 0.05 }}>
                <p className="works-p-2"><span className="works-span-2">{"Write"}</span></p>
              </TextFx>
            </div>
            <div className="works-box-48">
              <div className="works-box-49" />
              <TextFx className="works-live-shows" as="div" tokenization="line" transition={{ ...tween(0.4), delay: 0.05 }}>
                <p className="works-p-3"><span className="works-run">{"Review"}</span></p>
              </TextFx>
            </div>
            <div className="works-box-50">
              <div className="works-box-51" />
              <TextFx className="works-receipts" as="div" tokenization="line" transition={{ ...tween(0.4), delay: 0.05 }}>
                <p className="works-p-4">{"Publish"}</p>
              </TextFx>
            </div>
            <div className="works-box-52">
              <div className="works-box-53" />
              <TextFx className="works-cc" as="div" tokenization="line" transition={{ ...tween(0.4), delay: 0.05 }}>
                <p className="works-p-5"><span className="works-span-9">{"Receipt"}</span></p>
              </TextFx>
            </div>
          </div>
        </div>
        <div className="works-box-54">
          <div className="works-box-55">
            <Reveal className="works-box-56" as="div" from={{ opacity: 0 }} to={{ opacity: 1 }} transition={tween(0.4)} target="works">
              <div className="works-slot">
                <Reveal className="works-box-57" as="div" from={{ width: 1 }} to={{ width: "auto" }} transition={spring(0.4, 0.2)} target="works">
                  <div className="works-box-58">
                    <img className="works-img-15" src="/images/YhJq8KLzyVzOYf5bBqcGGsMAUVo.png" alt="" draggable={false} />
                  </div>
                  <Reveal className="works-works" as="div" from={{ opacity: 0 }} to={{ opacity: 1 }} transition={spring(0.4, 0.2)} target="works">
                    <h2 className="works-h2">{"Why Colophon"}</h2>
                  </Reveal>
                </Reveal>
              </div>
              <div className="works-box-59" />
            </Reveal>
          </div>
          <TextFx className="works-box-60" as="div" tokenization="line" transition={{ ...tween(0.4), delay: 0.075 }} target="works">
            <p className="works-p-6">{"Every release recorded, every change reviewed."}</p>
          </TextFx>
        </div>
      </div>
    </div>
  );
}
