import { RollingText } from "../components/RollingText";
import { Svg } from "../components/Svg";
import { TextFx } from "../components/TextFx";
import { Press } from "../components/Press";
import { Reveal, tween, spring } from "../components/Reveal";
import "./Blogs.css";

export function Blogs() {
  return (
    <div className="blogs-blogs-section">
      <div className="blogs-hero-83">
        <div className="blogs-box">
          <Reveal className="blogs-box-2" as="div" from={{ opacity: 0 }} to={{ opacity: 1 }} transition={tween(0.4)} target="blogs">
            <div className="blogs-slot">
              <Reveal className="blogs-box-3" as="div" from={{ width: 1 }} to={{ width: "auto" }} transition={spring(0.4, 0.2)} target="blogs">
                <div className="blogs-box-4">
                  <img className="blogs-img" src="/images/ozaiClobDR5iSAqsGL37MTadxVs.png" alt="" draggable={false} />
                </div>
                <Reveal className="blogs-blogs" as="div" from={{ opacity: 0 }} to={{ opacity: 1 }} transition={spring(0.4, 0.2)} target="blogs">
                  <p className="blogs-p">
                    <span className="blogs-span">{"Blog"}</span>
                  </p>
                </Reveal>
              </Reveal>
            </div>
            <div className="blogs-box-5" />
          </Reveal>
          <div className="blogs-box-6">
            <TextFx className="blogs-make-your-content-connected" as="div" tokenization="line" transition={{ ...tween(0.4), delay: 0.075 }}>
              <p className="blogs-p-2">{"Notes on publishing "}<span className="blogs-run">{"you can check"}</span></p>
            </TextFx>
          </div>
        </div>
        <div className="blogs-box-7">
          <div className="blogs-box-8">
            <div className="blogs-box-9">
              <Svg className="blogs-svg" id="svg10" />
            </div>
          </div>
          <div className="blogs-box-10">
            <div className="blogs-box-11" data-fx="blogs">
              <Reveal className="blogs-box-12" as="div" from={{ opacity: 0 }} to={{ opacity: 1 }} transition={tween(0.8)} target="blogs">
                <div className="blogs-box-13">
                  <div className="blogs-box-14">
                    <img className="blogs-img-2" src="/images/colophon/blog-glossary.webp" alt="" draggable={false} />
                  </div>
                </div>
                <div className="blogs-box-15">
                  <div className="blogs-box-16">
                    <img className="blogs-img-3" src="/images/colophon/blog-glossary.webp" alt="" draggable={false} />
                  </div>
                </div>
              </Reveal>
              <div className="blogs-box-17">
                <div className="blogs-box-18">
                  <div className="blogs-box-19">
                    <div className="blogs-box-20" />
                    <TextFx className="blogs-june-11-2025" as="div" tokenization="line" transition={{ ...tween(0.4), delay: 0.075 }} target="blogs">
                      <p className="blogs-p-3"><span className="blogs-run-2">{"17 November 2026 "}</span></p>
                    </TextFx>
                  </div>
                  <div className="blogs-box-21">
                    <TextFx className="blogs-geo-for-pr-measurement-in-si" as="div" tokenization="line" transition={{ ...tween(0.4), delay: 0.075 }} target="blogs">
                      <p className="blogs-p-4">{"Headless CMS glossary: terms in plain words"}</p>
                    </TextFx>
                  </div>
                </div>
                <a className="blogs-link" href="./">
                  <TextFx className="blogs-learn-more" as="div" tokenization="line" transition={{ ...tween(0.4), delay: 0.075 }} target="blogs">
                    <p className="blogs-p-5"><span className="blogs-run-3">{"Read"}</span><span className="blogs-run-4">{" "}</span><span className="blogs-run-3">{"post"}</span></p>
                  </TextFx>
                  <div className="blogs-box-22">
                    <div className="blogs-box-23">
                      <Svg className="blogs-svg-2" id="svg9" />
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="blogs-box-24">
              <div className="blogs-box-25">
                <Svg className="blogs-svg-3" id="svg13" />
              </div>
            </div>
            <div className="blogs-box-26">
              <a className="blogs-link-2" href="./">
                <div className="blogs-box-27">
                  <div className="blogs-box-28" />
                  <TextFx className="blogs-june-11-2025-2" as="div" tokenization="line" transition={{ ...tween(0.4), delay: 0.075 }} target="blogs">
                    <p className="blogs-p-6"><span className="blogs-run-2">{"16 November 2026 "}</span></p>
                  </TextFx>
                </div>
                <div className="blogs-box-29">
                  <div className="blogs-box-30">
                    <TextFx className="blogs-geo-for-pr-measurement-in-si-2" as="div" tokenization="line" transition={{ ...tween(0.4), delay: 0.075 }} target="blogs">
                      <p className="blogs-p-7">{"Give AI agents CMS access, not the publish button"}</p>
                    </TextFx>
                  </div>
                  <div className="blogs-box-31">
                    <div className="blogs-box-32">
                      <Svg className="blogs-svg-4" id="svg14" />
                    </div>
                  </div>
                </div>
                <div className="blogs-box-33">
                  <div className="blogs-box-34">
                    <Svg className="blogs-svg-5" id="svg14" />
                  </div>
                </div>
              </a>
              <div className="blogs-box-35">
                <div className="blogs-box-36">
                  <Svg className="blogs-svg-6" id="svg15" />
                </div>
              </div>
              <a className="blogs-link-3" href="./">
                <div className="blogs-box-37">
                  <div className="blogs-box-38" />
                  <TextFx className="blogs-june-11-2025-3" as="div" tokenization="line" transition={{ ...tween(0.4), delay: 0.075 }} target="blogs">
                    <p className="blogs-p-8"><span className="blogs-run-2">{"16 November 2026 "}</span></p>
                  </TextFx>
                </div>
                <div className="blogs-box-39">
                  <div className="blogs-box-40">
                    <TextFx className="blogs-box-41" as="div" tokenization="line" transition={{ ...tween(0.4), delay: 0.075 }} target="blogs">
                      <p className="blogs-p-9">{"What happens to your draft when the CMS crashes"}</p>
                    </TextFx>
                  </div>
                  <div className="blogs-box-42">
                    <div className="blogs-box-43">
                      <Svg className="blogs-svg-7" id="svg16" />
                    </div>
                  </div>
                </div>
                <div className="blogs-box-44">
                  <div className="blogs-box-45">
                    <Svg className="blogs-svg-8" id="svg16" />
                  </div>
                </div>
              </a>
              <div className="blogs-box-46">
                <div className="blogs-box-47">
                  <Svg className="blogs-svg-9" id="svg15" />
                </div>
              </div>
              <div className="blogs-slot-2">
                <a className="blogs-link-4" data-name="Default">
                  <Press className="blogs-slot-3" as="div" data-name="Label">
                    <RollingText className="blogs-box-48" text="More posts" color="rgb(255, 255, 255)" fontFamily={"Inter, \"Inter Placeholder\", sans-serif"} fontWeight={400} />
                  </Press>
                  <div className="blogs-box-49">
                    <div className="blogs-box-50">
                      <div className="blogs-box-51">
                        <img className="blogs-img-4" src="/images/XxkKDiuJDVV0jKAS4a8ieVIfhak.svg" alt="" draggable={false} />
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="blogs-box-52">
            <div className="blogs-box-53">
              <Svg className="blogs-svg-10" id="svg10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
