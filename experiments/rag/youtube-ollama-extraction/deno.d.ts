// Type definitions for Deno
// This file provides TypeScript type definitions for Deno APIs

declare namespace Deno {
  /** Command line arguments passed to the script. */
  export const args: string[];
  /** Run a subprocess with the given options. */
  export function run(options: {
    cmd: string[];
    cwd?: string;
    env?: Record<string, string>;
    stdout?: "piped" | "inherit" | "null";
    stderr?: "piped" | "inherit" | "null";
    stdin?: "piped" | "inherit" | "null";
  }): Process;

  /** Read a text file from the given path. */
  export function readTextFile(path: string): Promise<string>;

  /** Write a text file to the given path. */
  export function writeTextFile(path: string, data: string): Promise<void>;

  /** Make a temporary file. */
  export function makeTempFile(options?: { prefix?: string; suffix?: string }): Promise<string>;

  /** Remove a file or directory. */
  export function remove(path: string, options?: { recursive?: boolean }): Promise<void>;

  /** Standard output for the process. */
  export const stdout: {
    writeSync(data: Uint8Array): number;
  };

  /** Exit the Deno process with optional exit code. */
  export function exit(code?: number): never;

  /** Process interface for interacting with subprocesses. */
  export interface Process {
    /** The process ID. */
    readonly pid: number;
    /** The status of the process. */
    status(): Promise<ProcessStatus>;
    /** The output of the process. */
    output(): Promise<Uint8Array>;
    /** The error output of the process. */
    stderrOutput(): Promise<Uint8Array>;
    /** Close the process. */
    close(): void;
  }

  /** Status of a process. */
  export interface ProcessStatus {
    /** Whether the process succeeded. */
    success: boolean;
    /** The exit code of the process. */
    code: number;
    /** The signal that killed the process, if any. */
    signal: number | null;
  }
}

// TextEncoder interface
interface TextEncoder {
  encode(input?: string): Uint8Array;
}

// TextDecoder interface
interface TextDecoder {
  decode(input?: Uint8Array): string;
}
