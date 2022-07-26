import { i18n } from "@lingui/core";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import { Heading } from "@/components/heading";
import Avatar from "@/components/avatar";
import CircularDiv from "@/components/circular-div";
import Link from "@/components/link";
import Nav from "@/components/nav";

import InterventionDetailInfo from "module/intervention/InterventionDetailInfo";
import { AppRoutes } from "utils/routes";
import InterventionActivityLog from "module/intervention/InterventionActivityLog";
import InterventionForm from "module/intervention/InterventionForm";
import { SiteFooter } from "@/components/Site/Footer/SiteFooter";
import { ICreateIntervention } from "module/intervention/types/InterventionType";
import { Button, ButtonTypes } from "@/components/Button";

const CreateInterventions = () => {
  const formik = useFormik<ICreateIntervention>({
    initialValues: {
      intervention: "Talk to school",
      description:
        "Talk to school teachers (Chandler Bing, Monica Geller), principal (Ross Geller), and school therapist (Joey Tribbiani). Primary teacher: Chandler Bing.",
      assign_to: "jake",
      due_on: new Date(),
      status: "not-started",
      intervention_effective: "somewhat-effective",
      effectiveness_desc:
        "Teachers were a bit indifferent to cat cat and only provided some information",
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log("the values", values);
      setSubmitting(false);
    },
  });

  return (
    <div>
      <Nav>
        <div className="flex justify-between">
          <div className="flex align-center items-center items-center align-center gap-8">
            <Link
              href={AppRoutes.INTTERVENTIONS}
              content={
                <FontAwesomeIcon
                  size="lg"
                  color="#495057"
                  icon={solid("angle-left")}
                />
              }
            />
            <Heading
              customClass="capitalize"
              content={i18n._(/*i18n*/ "create new intervention")}
            />
          </div>
          <div className="flex align-center items-center gap-8">
            <div
              className="flex align-center items-center"
              style={{
                gap: "1rem",
              }}
            >
              {[1, 2, 3].map((item) => (
                <Avatar key={item} />
              ))}
              <CircularDiv
                variant="light"
                content={
                  <FontAwesomeIcon
                    size="lg"
                    color="#495057"
                    icon={solid("plus")}
                  />
                }
              />
            </div>

            <div
              className="flex align-center items-center"
              style={{
                gap: ".8rem",
              }}
            >
              <Button
                variant={ButtonTypes.Default}
                onClick={() => console.log("button clicked")}
              >
                <span className="uppercase">{i18n._(/*i18n*/ "cancel")}</span>
              </Button>
              <Button
                variant={ButtonTypes.Primary}
                onClick={() => console.log("button clicked")}
              >
                <span className="uppercase">{i18n._(/*i18n*/ "save")}</span>
              </Button>
            </div>
          </div>
        </div>
      </Nav>
      <div
        className="flex flex-col flex-1 gap-8"
        style={{
          padding: "2rem 3rem",
        }}
      >
        <div className="flex flex-grow-1 w-100 gap-8">
          <div className="w-50 flex flex-col gap-8">
            <Heading
              content={i18n._(/*i18n*/ "create intervention")}
              customClass="capitalize"
              variant="title-primary"
            />
            <InterventionForm formik={formik} />
          </div>
          {/* detail card */}
          <InterventionDetailInfo
            hideButton={Boolean(formik.values.status === "completed")}
          />
        </div>

        {/* activity-log */}
        <InterventionActivityLog />

        <SiteFooter />
      </div>
    </div>
  );
};

export default CreateInterventions;
