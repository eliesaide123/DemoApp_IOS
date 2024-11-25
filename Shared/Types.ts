interface MainResponseWithUIToken extends MainResponse {
  imS_UIToken: string;
}

interface ProfileInterface {
  MobileNo: string;
  Email: string;
}

interface GetConnectData extends MainResponse {
  user_Role: string;
  user_Pin: number;
  responseData: GetConnectDataResponseData;
}
interface RolesUserData {
  roleSeq: number;
  roleCode: string;
  roleName: string;
  relatedPIN: number;
  relatedName: string;
}
interface UserDataInConnectData {
  gender: string;
  dob: string;
  fullName: string;
  kycLevel: number;
  kycDescription: string;
  roles: RolesUserData[];
}

interface ProdGroup {
  groupSeq: number;
  groupCode: string;
  groupName: string;
  nbrPolicies: number;
}

interface OSPremium {
  currency: string;
  fresh: boolean;
  nbrPremiums: number;
  osAmount: number;
  availablePG: boolean;
}

interface OSClaim {
  currency: string;
  fresh: boolean;
  nbrOSClaims: number;
  nbrReadyToSettle: number;
  r2SAmount: number;
}

interface PendingRequest {
  nbrRequests: number;
}

interface PendingRenewal {
  nbrRenewals: number;
}

interface BuyOnline {
  getQuoteURL: string;
}

interface ClientSpaceLoginURL {
  getLoginURL: string;
}

interface GetConnectDataResponseData {
  userData: UserDataInConnectData[];
  prodGroups: ProdGroup[];
  osPremiums: OSPremium[];
  osClaims: OSClaim[];
  pendingRequests: PendingRequest[];
  pendingRenewals: PendingRenewal[];
  buyOnline: BuyOnline[];
  clientSpace: ClientSpaceLoginURL[];
}

interface AgentOptionsDataResponse extends MainResponse {
  agentOptionsData: {
    agentEntities: AgentEntity[];
  };
}

interface AgentClientsDataResponse extends MainResponse {
  agentClientsData: {
    agentClients: AgentClient[];
  };
}

interface AgentEntity {
  entityCode: string;
  entityDesc: string;
}
interface AgentClient {
  pin: number;
  fullName: string;
  address: string;
  phones: string;
}

export interface Cover {
  coverNo: string;
  coverCode: string;
  insuredCover: string;
  insuredSI: string;
  sumInsured: 0;
  deductible: string;
  notes: string;
}

interface GetCover extends MainResponse {
  currency: string;
  riskDetails: {
    covers: Cover[];
  };
}

interface GetGenRiskDataResponse extends MainResponse {
  currency: string;
  riskDetails: {
    dataItems: GenRiskDataItems[];
  };
}

export interface GenRiskDataItems {
  itemDesc: string;
  itemSI: string;
  itemValue: string;
  hasCovers: true;
  itemCovers: GenRiskDataItemsCover[];
}
interface GenRiskDataItemsCover {
  itemCoverSeq: string;
  itemCoverName: string;
  itemCoverDeductible: string;
  itemCoverNotes: string;
}

interface RequestActions extends MainResponse {
  policyActionsData: {
    policyActions: PolicyAction[];
    specialActions: SpecialAction[];
  };
}
interface PolicyAction {
  actionCode: string;
  actionDesc: string;
  actionPrint: boolean;
}

interface SpecialAction {
  actionCode: string;
  actionDesc: string;
  actionValue: string;
  actionSubject: string;
  actionTemplate: string;
}

interface RequestActionData {
  requestReference: string;
  policyNo: string;
  policySerNo: number;
  actionCode: string;
  reasonCode: string;
  inception: string;
  attachList: string;
  notes: string;
}

export interface RequestUploadFile {
  fileName: string;
  payload: string;
}

export interface MainResponse {
  status: boolean;
  error_Code: number;
  error_Description: string;
}

export interface SettleDetails {
  unpaidRefer: string;
  claimSerial: number;
  osAmountFC: number;
  osAmountLC: number;
}

export interface ClaimSettle {
  requestReference: string;
  policyNo: string;
  imsClaimNo: string;
  actionCode: string;
  settleAction: string;
  inception: string;
  bank: string;
  iban: string;
  notes?: string;
  settleDetails: SettleDetails[];
}

export interface ActiveRequest {
  requestSerno: number;
  polAction: string;
  requestStatus: string;
  statusdate: string;
  attachedFiles: string;
  rejectionNote: string;
  htmlFile: string;
  requestNote: string;
  createdOn: string;
  sinception: string;
  reqRef: string;
  allowCancel: boolean;
}

export interface GetRequestsRequestData {
  policyNo: string;
  productName: string;
  activeRequests: ActiveRequest[];
}

//Generic send request
export interface SendRequest<T> {
  request: T;
}
//Generic received request
export interface ReceivedResponse<T> {
  response: T;
}

//Settle Claims Creds
export interface SettleClaimsCredentials {
  claimSettleData: {
    claimSettle: ClaimSettle[];
  };
}

//Login Credentials
export interface LoginCredentials {
  mA_UserID: string;
  cS_UserID: string;
  cS_Password: string;
}

//Login endpoint response
export interface LoginResponse {
  response: MainResponseWithUIToken;
}

//Register endpoint response
export interface RegisterResponse {
  response: MainResponse;
}

//Change password endpoint response
export interface ChangePasswordResponse {
  response: MainResponse;
}

//Renew Token endpoint response
export interface RenewTokenResponse {
  response: MainResponseWithUIToken;
}

//Invalid Token endpoint response
export interface InvalidTokenResponse {
  response: MainResponse;
}

//Get Profile endpoint response
export interface GetProfileResponse {
  response: ProfileInterface[];
}

//Update Profile endpoint response
export interface UpdateProfileResponse {
  response: MainResponse;
}

//Get Connect Data endpoint response
export interface GetConnectDataResponse {
  response: GetConnectData;
}

//Request Print endpoint response
export interface RequestPrintResponse {
  response: MainResponse;
}

//Request Print Credentials
export interface RequestPrintCredentials {
  policyNo: string;
  actionCode: string;
}

export interface GetDetailsLegalAddressResponse {
  response: {
    error_Code: number;
    error_Description: string;
    policyDetails: {legalAddress: any[]};
    status: boolean;
  };
}
export interface GetPolicyDetailsResponse {
  response: {
    error_Code: number;
    error_Description: string;
    policyDetails: any;
    status: boolean;
  };
}

export interface GetDetailsBeneficiaryResponse {
  response: {
    error_Code: number;
    error_Description: string;
    policyDetails: {beneficiaries: any[]};
    status: boolean;
  };
}

export interface GetRequestsResponse {
  response: {
    error_Code: number;
    error_Description: string;
    status: boolean;
    requestsData: {
      policies: GetRequestsRequestData[];
    };
  };
}

export interface PolicyResponse {
  response: {
    responseData: {
      policyholderData: PolicyholderData[];
      policyList: Policy[];
    };
    status: boolean;
    error_Code: number;
    error_Description: string;
  };
}

export interface PolicyholderData {
  gender: string;
  dob: string;
  fullName: string;
}

export interface Policy {
  productTag: string;
  policyTag: string;
  expiryTag: string;
  policyNo: string;
  currency: string;
  premium: string;
  payFrequency: string;
  prodTemplate: string;
  policyDetailsURI: string;
  policyDataURI: string;
  policyCoversURI: string;
  policyInsCoversURI: string;
  suffix: string;
}

export interface AgentOptionsResponse {
  response: AgentOptionsDataResponse;
}

export interface AgentClientsResponse {
  response: AgentClientsDataResponse;
}

export interface GetCoverResponse {
  response: GetCover;
}

export interface GetGenRiskData {
  response: GetGenRiskDataResponse;
}

export interface RequestActionsResponse {
  response: RequestActions;
}

export interface RequestInfo {
  requestReference: string;
  policySerNo: number;
  productName: string;
  inception: string;
  editInception: boolean;
  maxFileUpload: number;
  helpMsg: string;
  disclaimer: string;
  reasons: null | any;
}

export interface RequestInfoData {
  requestInfo: RequestInfo[];
}

export interface ResponseRequestAction {
  requestInfoData: RequestInfoData;
  status: boolean;
  error_Code: number;
  error_Description: string;
}

export interface ApiResponseRqAction {
  response: ResponseRequestAction;
}

export interface RequestUploadActionRequest {
  policyNo: string;
  requestReference: string;
  requestUpload: {
    requestUploadFile: RequestUploadFile[] | undefined;
  };
}

export interface SubmitRequestResponse {
  requestData: {
    requestActionData: RequestActionData[];
  };
}
