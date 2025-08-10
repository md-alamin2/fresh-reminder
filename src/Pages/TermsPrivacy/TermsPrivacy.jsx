import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const TermsPrivacy = () => {
  return (
    <div className="min-h-[calc(100vh-450px)] w-full">
      <title>FreshReminder-Terms & Privacy</title>
      <div className="w-11/12 md:max-w-4xl  mx-auto p-6 my-6 md:my-10 bg-base-100 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          Terms & Conditions & Privacy Policy
        </h1>

        <Tabs>
          <TabList className="flex gap-4 border-b border-gray-300">
            <Tab className="cursor-pointer px-4 py-2 font-medium focus:outline-none">
              Terms & Conditions
            </Tab>
            <Tab className="cursor-pointer px-4 py-2 font-medium focus:outline-none">
              Privacy Policy
            </Tab>
          </TabList>

          {/* Terms & Conditions */}
          <TabPanel>
            <div className="mt-4 space-y-4 ">
              <h2 className="text-xl font-semibold">1. Introduction</h2>
              <p>
                By using our services, you agree to comply with and be bound by
                these Terms and Conditions.
              </p>

              <h2 className="text-xl font-semibold">2. Use of Service</h2>
              <p>
                You agree to use the service only for lawful purposes and in a
                way that does not infringe on others' rights.
              </p>

              <h2 className="text-xl font-semibold">3. Changes to Terms</h2>
              <p>
                We reserve the right to update these terms at any time.
                Continued use of the service after changes means you accept
                them.
              </p>
            </div>
          </TabPanel>

          {/* Privacy Policy */}
          <TabPanel>
            <div className="mt-4 space-y-4 ">
              <h2 className="text-xl font-semibold">
                1. Information We Collect
              </h2>
              <p>
                We may collect personal information such as name, email, and
                contact details when you use our services.
              </p>

              <h2 className="text-xl font-semibold">
                2. How We Use Information
              </h2>
              <p>
                The collected information is used to improve services, process
                transactions, and communicate with users.
              </p>

              <h2 className="text-xl font-semibold">3. Data Protection</h2>
              <p>
                We take reasonable steps to protect your personal information
                from unauthorized access or disclosure.
              </p>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default TermsPrivacy;
