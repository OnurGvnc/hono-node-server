import {
  fetch as webFetch,
  Headers as WebHeaders,
  Request as WebRequest,
  Response as WebResponse,
  FormData as NodeFormData,
} from '@remix-run/web-fetch'

import { File as NodeFile, Blob as NodeBlob } from '@remix-run/web-file'

import type { Readable } from 'node:stream'
import {
  ReadableStream as NodeReadableStream,
  WritableStream as NodeWritableStream,
} from '@remix-run/web-stream'

// credits: https://github.com/remix-run/remix/blob/main/packages/remix-node/fetch.ts

type NodeHeadersInit = ConstructorParameters<typeof WebHeaders>[0]
type NodeResponseInit = NonNullable<ConstructorParameters<typeof WebResponse>[1]>
type NodeRequestInfo = ConstructorParameters<typeof WebRequest>[0] | NodeRequest
type NodeRequestInit = Omit<NonNullable<ConstructorParameters<typeof WebRequest>[1]>, 'body'> & {
  body?: NonNullable<ConstructorParameters<typeof WebRequest>[1]>['body'] | Readable
}

export type {
  NodeHeadersInit as HeadersInit,
  NodeRequestInfo as RequestInfo,
  NodeRequestInit as RequestInit,
  NodeResponseInit as ResponseInit,
}

class NodeRequest extends WebRequest {
  constructor(info: NodeRequestInfo, init?: NodeRequestInit) {
    super(info, init as RequestInit)
  }

  public get headers(): WebHeaders {
    return super.headers as WebHeaders
  }

  public clone(): NodeRequest {
    return super.clone() as NodeRequest
  }
}

class NodeResponse extends WebResponse {
  public get headers(): WebHeaders {
    return super.headers as WebHeaders
  }

  public clone(): NodeResponse {
    return super.clone() as NodeResponse
  }
}

export { NodeResponse as Response, NodeRequest as Request, WebHeaders as Headers }

export const nodeFetch: typeof webFetch = (info: NodeRequestInfo, init?: NodeRequestInit) => {
  init = {
    // Disable compression handling so people can return the result of a fetch
    // directly in the loader without messing with the Content-Encoding header.
    compress: false,
    ...init,
  }

  return webFetch(info, init as RequestInit)
}

// credits: https://github.com/remix-run/remix/blob/main/packages/remix-node/base64.ts
export function atob(a: string): string {
  return Buffer.from(a, 'base64').toString('binary')
}

export function btoa(b: string): string {
  return Buffer.from(b, 'binary').toString('base64')
}

// credits: https://github.com/remix-run/remix/blob/main/packages/remix-node/globals.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
    }

    interface Global {
      atob: typeof atob
      btoa: typeof btoa

      Blob: typeof Blob
      File: typeof File

      Headers: typeof Headers
      Request: typeof Request
      Response: typeof Response
      fetch: typeof fetch
      FormData: typeof FormData

      ReadableStream: typeof ReadableStream
      WritableStream: typeof WritableStream
    }
  }
}

export function installGlobals() {
  global.atob = atob
  global.btoa = btoa

  global.Blob = NodeBlob
  global.File = NodeFile

  global.Headers = WebHeaders as typeof Headers
  global.Request = NodeRequest as typeof Request
  global.Response = NodeResponse as unknown as typeof Response
  global.fetch = nodeFetch as typeof fetch
  global.FormData = NodeFormData

  global.ReadableStream = NodeReadableStream
  global.WritableStream = NodeWritableStream
}
