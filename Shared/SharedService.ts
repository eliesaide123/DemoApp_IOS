import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {
  GetConnectDataResponse,
  GetRequestsResponse,
  LoginCredentials,
  LoginResponse,
  PolicyResponse,
  RequestPrintResponse,
  RequestPrintCredentials,
  SendRequest,
  AgentOptionsResponse,
  AgentClientsResponse,
  ClaimSettle,
  SettleClaimsCredentials,
  GetCoverResponse,
  GetDetailsLegalAddressResponse,
  GetDetailsBeneficiaryResponse,
  GetGenRiskData,
  GetPolicyDetailsResponse,
  RequestActionsResponse,
  ApiResponseRqAction,
  RequestUploadActionRequest,
  RequestUploadFile,
  MainResponse,
  ReceivedResponse,
  SubmitRequestResponse,
} from './Types';
import _settings from './settings';
import _shared from '../screens/common';

interface ApiResponse {
  response?: {
    error_Description?: string;
    details?: string;
    status: boolean;
  };
}

//Login Screen
export async function LoginService(credentials: LoginCredentials) {
  const request: SendRequest<LoginCredentials> = {request: credentials};
  const response = await SharedService.ClientProxy<LoginResponse>(
    '/account/login',
    'POST',
    request,
  );
  return response;
}

//CSConnect Screen
export async function CSConnectService(
  pin?: string,
  role?: string,
): Promise<GetConnectDataResponse | undefined> {
  const extraHeaders: Record<string, string> = {};

  if (pin) {
    extraHeaders['x-user-ims-pin'] = pin;
    extraHeaders['x-user-ims-role'] = role || _shared.role;
  }

  const response = await SharedService.ClientProxy<GetConnectDataResponse>(
    '/csconnect',
    'GET',
    {},
    extraHeaders,
  );

  return response ?? ({} as GetConnectDataResponse);
}

//GetPolicy Screen
export async function GetPolicyService(
  groupCode: string,
): Promise<PolicyResponse | undefined> {
  const extraHeaders: Record<string, string> = {
    'x-user-ims-pin': _shared.pin,
    'x-user-ims-role': _shared.role,
  };
  const response = await SharedService.ClientProxy<PolicyResponse>(
    `/policy?ProductGroup=${groupCode}`,
    'GET',
    {},
    extraHeaders,
  );
  return response ?? ({} as PolicyResponse);
}

export async function GetRequests(policyNo: string) {
  const url = `/request${policyNo ? `?policyNo=${policyNo}` : ''}`;
  const response = await SharedService.ClientProxy<GetRequestsResponse>(
    `${url}`,
    'GET',
    {},
    {
      'x-user-ims-pin': _shared.pin,
      'x-user-ims-role': _shared.role,
    },
  );
  return response?.response;
}

export async function CancelRequest(policyNo: string, requestSerno: number) {
  const url = `/request/action${
    policyNo ? `?policyNo=${policyNo}&requestSerno=${requestSerno}` : ''
  }`;
  const response = await SharedService.ClientProxy<GetRequestsResponse>(
    url,
    'DELETE',
    {},
    {
      'x-user-ims-pin': _shared.pin,
      'x-user-ims-role': _shared.role,
    },
  );
  return response?.response;
}

export async function RequestPrint(
  userId: string,
  pin: string,
  role: string,
  policyNo: string,
  url: string,
  actionCode: string,
) {
  const request: SendRequest<RequestPrintCredentials> = {
    request: {policyNo, actionCode},
  };
  const response = await SharedService.ClientProxy<RequestPrintResponse>(
    `${url}`,
    'POST',
    request,
    {
      'x-auth-ims-userid': userId,
      'x-auth-ims-uitoken': _shared.ui_token,
      'x-user-ims-pin': pin,
      'x-user-ims-role': role,
    },
  );

  return response?.response;
}

export async function fetchRoleAndPin() {
  const response = await SharedService.ClientProxy<GetConnectDataResponse>(
    '/csconnect',
    'GET',
  );

  if (response?.response) {
    const {user_Role: role, user_Pin: pin} = response?.response;
    _shared.pin = pin.toString();
    _shared.role = role;
    return {role, pin};
  }
}

export async function getAgentSearchOptions() {
  let extraHeaders: Record<string, any> = {};
  if (_shared.pin) {
    extraHeaders['x-user-ims-pin'] = _shared.pin;
    extraHeaders['x-user-ims-role'] = _shared.role;
  }

  const response = await SharedService.ClientProxy<AgentOptionsResponse>(
    '/agent/clients/options',
    'GET',
    {},
    extraHeaders,
  );

  return response?.response.agentOptionsData.agentEntities || [];
}

export async function PerformSearch(searchParams: any) {
  function toQueryString(params: any) {
    return (
      '?' +
      Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
    );
  }

  let extraHeaders: Record<string, any> = {};
  if (_shared.pin) {
    extraHeaders['x-user-ims-pin'] = _shared.pin;
    extraHeaders['x-user-ims-role'] = _shared.role;
  }

  const response = await SharedService.ClientProxy<AgentClientsResponse>(
    `/agent/clients${toQueryString(searchParams)}`,
    'GET',
    {},
    extraHeaders,
  );
  return response?.response.agentClientsData.agentClients || [];
}

export async function GetClaimsSettle(
  PolicyNo: string,
  IMSClaimNo: string,
  SettleAction: string,
) {
  const queryParams = `?PolicyNo=${PolicyNo}&IMSClaimNo=${IMSClaimNo}&SettleAction=${SettleAction}`;
  const response = await SharedService.ClientProxy(
    `/claim/settle/options${queryParams}`,
    'GET',
    {},
    {
      'x-user-ims-pin': _shared.pin,
      'x-user-ims-role': _shared.role,
    },
  );
  return response;
}

export async function SettleClaim(credentials: ClaimSettle) {
  const request: SendRequest<SettleClaimsCredentials> = {
    request: {claimSettleData: {claimSettle: [credentials]}},
  };
  const response = await SharedService.ClientProxy(
    `/claim/settle`,
    'POST',
    request,
    {
      'x-user-ims-pin': _shared.pin,
      'x-user-ims-role': _shared.role,
    },
  );
  return response?.response;
}

export async function GetClaims(PolicyNo: string, OS_Only: boolean) {
  const queryParams = `?${
    PolicyNo ? `PolicyNo=${PolicyNo}&` : ''
  }OS_Only=${OS_Only}`;

  console.log('queryParams: ', queryParams);
  const response = await SharedService.ClientProxy(
    `/claim${queryParams}`,
    'GET',
    {},
    {
      'x-user-ims-pin': _shared.pin,
      'x-user-ims-role': _shared.role,
    },
  );
  return response;
}

export async function GetAdvancedLifeCover(
  policyNo: string,
  riskNo: number,
  coversURL: string,
) {
  const response = await SharedService.ClientProxy<GetCoverResponse>(
    `/policy${coversURL}?policyNo=${policyNo}&riskNo=${riskNo}`,
    'GET',
    {},
    {
      'x-user-ims-pin': _shared.pin,
      'x-user-ims-role': _shared.role,
    },
  );
  return response?.response;
}

export async function GetDetails(policyNo: string, url: string) {
  console.log(url);
  const response = await SharedService.ClientProxy<
    GetDetailsLegalAddressResponse | GetDetailsBeneficiaryResponse
  >(
    `${url}?policyNo=${policyNo}`,
    'GET',
    {},
    {
      'x-user-ims-pin': _shared.pin,
      'x-user-ims-role': _shared.role,
    },
  );
  return response;
}

export async function GetGenRisk(
  policyNo: string,
  riskNo: number,
  policyDataURI: string,
) {
  const response = await SharedService.ClientProxy<GetGenRiskData>(
    `/policy${policyDataURI}?policyNo=${policyNo}&riskNo=${riskNo}`,
    'GET',
    {},
    {
      'x-user-ims-pin': _shared.pin,
      'x-user-ims-role': _shared.role,
    },
  );

  return response?.response;
}

export async function GetGenRiskCovers(
  policyNo: string,
  riskNo: number,
  coversURL: string,
) {
  const response = await SharedService.ClientProxy<GetCoverResponse>(
    `/policy${coversURL}?policyNo=${policyNo}&riskNo=${riskNo}`,
    'GET',
    {},
    {
      'x-user-ims-pin': _shared.pin,
      'x-user-ims-role': _shared.role,
    },
  );

  return response?.response;
}

export async function GetPolicyDetails(
  policyNo: string,
  policyDetailsURI: string,
) {
  const response = await SharedService.ClientProxy<GetPolicyDetailsResponse>(
    `/policy${policyDetailsURI}?policyNo=${policyNo}`,
    'GET',
    {
      'x-user-ims-pin': _shared.pin,
      'x-user-ims-role': _shared.role,
    },
  );

  return response?.response;
}

export async function GetRequestActions(policyNo: string) {
  const response = await SharedService.ClientProxy<RequestActionsResponse>(
    `/request/action?policyNo=${policyNo}`,
    'GET',
    {},
    {
      'x-user-ims-pin': _shared.pin,
      'x-user-ims-role': _shared.role,
    },
  );
  return response?.response;
}

//Request Action
export async function RequestAction(policyNo: string, actionCode: string) {
  const headers = {
    'x-user-ims-pin': _shared.pin,
    'x-user-ims-role': _shared.role,
  };

  const url = `/request/action/data?PolicyNo=${policyNo}&ActionCode=${actionCode}`;
  const response = await SharedService.ClientProxy<ApiResponseRqAction>(
    url,
    'GET',
    {},
    headers,
  );
  return response;
}

export async function RequestUploadAction(
  policyNo: string,
  rqRef: string,
  uploadFiles: RequestUploadFile[] | undefined,
) {
  const headers = {
    'x-user-ims-pin': _shared.pin,
    'x-user-ims-role': _shared.role,
  };

  const url = `/request/action/upload`;
  const request: SendRequest<RequestUploadActionRequest> = {
    request: {
      policyNo: policyNo,
      requestReference: rqRef,
      requestUpload: {
        requestUploadFile: uploadFiles || [],
      },
    },
  };
  const response = await SharedService.ClientProxy<ReceivedResponse<MainResponse>>(
    url,
    'POST',
    request,
    headers,
  );
  return response;
}

export async function SubmitRequest(
  policyNo: string,
  rqRef: string,
  polserno:number|undefined,
  actionCode:string,
  reasonCode:string,
  inception:string,
  attachFiles: string | undefined,
  notes:string
) {
  const headers = {
    'x-user-ims-pin': _shared.pin,
    'x-user-ims-role': _shared.role,
  };

  const url = `/request/action`;
  const request: SendRequest<SubmitRequestResponse> = {
    request: {
      requestData:{
        requestActionData:[
          {
            requestReference: rqRef,
            policyNo: policyNo,
            policySerNo: polserno ?? 0,
            actionCode: actionCode,
            reasonCode: reasonCode,
            inception: inception,
            attachList: attachFiles || "",
            notes: notes,
          }
        ]
      }
    }
  };
  const response = await SharedService.ClientProxy<ReceivedResponse<MainResponse>>(
    url,
    'POST',
    request,
    headers,
  );
  return response;
}

const BASE_URL = 'http://dqapi-sna.dq.com.lb:88/api';

const defaultHeaders = {
  Accept: 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
};

let setAlert: any = () => {};

const SharedService = {
  setAlertHandler: (handler: any) => {
    setAlert = handler;
  },

  showAlert: (message: string) => {
    if (setAlert) {
      setAlert(message);
    }
  },

  async ClientProxy<T extends ApiResponse>(
    endpoint: string,
    method: 'GET' | 'POST' | 'DELETE' = 'GET',
    data: any = null,
    extraHeaders: object = {},
  ) {
    try {
      const variantHeaders = {
        'x-auth-ims-userid': _shared.userId,
        'x-auth-ims-uitoken': _shared.ui_token,
        'x-user-ims-lang': _settings.language,
      };
      const url = `${BASE_URL}${endpoint}`;
      const headers = {...defaultHeaders, ...variantHeaders, ...extraHeaders};
      const config: AxiosRequestConfig = {
        method,
        url,
        headers,
        data,
      };
      const response: AxiosResponse<T> = await axios(config)
      if (response && response.data?.response?.status == false) {
        SharedService.showAlert(
          response.data?.response?.error_Description || 'An error occurred.',
        );
      } else if (response && response.data?.response?.status) {
        return response.data;
      }
    } catch (error: any) {
      const errorDetails = error.response
        ? error.response.data.error.details
        : error.message;
        console.log(error)
      SharedService.showAlert(errorDetails);

      throw new Error(errorDetails);
    }
  },
};

export default SharedService;
