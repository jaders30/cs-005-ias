import React, { useState, useContext, useEffect } from "react";
import Card from "../components/common/Card";
import { FetchContext } from "../context/FetchContext";
import GradientBar from "../components/common/GradientBar";
import logo from "./../images/logo.png";
import { Redirect } from "react-router-dom";

const Confirm = (props) => {
  const fetchContext = useContext(FetchContext);
  const [redirectOnLogin, setRedirectOnLogin] = useState(false);
  useEffect(() => {
    const getConfimationCode = async () => {
      const theCode = props.match.params.confirmationCode;
      try {
        const { data } = await fetchContext.authAxios.get(`confirm/${theCode}`);
        const result = data.message;
        console.log(data.message);
        if (result === true) {
          setRedirectOnLogin(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getConfimationCode();
  }, []);
  return (
    <>
      {redirectOnLogin && <Redirect to="/login" />}
      <section className="w-full sm:w-1/2 h-screen m-auto p-8 sm:pt-10">
        <GradientBar />
        <Card>
          <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
              <div>
                <div className="w-32 m-auto mb-6">
                  <img src={logo} alt="Logo" />
                </div>
                <h2 className="mb-2 text-center text-3xl leading-9 font-extrabold text-gray-900">
                  CONFIRMATION DONE!
                </h2>
                <p className="text-gray-600 text-center">
                  Congratulations on your confirmation! I’m so glad to be a part
                  of your life as you continue your spiritual journey and grow
                  in your faith.
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-center"></p>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Confirm;
