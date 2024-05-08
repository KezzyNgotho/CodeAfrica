const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("HealthModule", (m) => {

  const lock = m.contract("HealthcareSystem");

  return { lock };
});
