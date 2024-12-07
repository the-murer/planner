import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/components/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>Gerencie seu&nbsp;</span>
          <span className={title({ color: "violet" })}>Time&nbsp;</span>
          <br />
          <span className={title()}>
            tenha controle total sobre suas agendas
          </span>
          <div className={subtitle({ class: "mt-4" })}>
            Gerencie suas weeklys com a plataforma Team Planner.
          </div>
        </div>

        {/* <div className="mt-8">
          <Snippet hideCopyButton hideSymbol variant="bordered">
            <span>
              Get started by editing{" "}
              <Code color="primary">pages/index.tsx</Code>
            </span>
          </Snippet>
        </div> */}
      </section>
    </DefaultLayout>
  );
}
