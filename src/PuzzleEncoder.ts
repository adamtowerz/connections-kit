import { ConnectionsPuzzle } from "./Connections";

export function encode(puzzle: ConnectionsPuzzle): string {
  const string = JSON.stringify(puzzle);
  const codeUnits = new Uint16Array(string.length);
  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = string.charCodeAt(i);
  }
  return btoa(String.fromCharCode(...new Uint8Array(codeUnits.buffer)));
}

export function decode(data: string): ConnectionsPuzzle {
  const binary = atob(data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const jsonString = String.fromCharCode(...new Uint16Array(bytes.buffer));

  const object = JSON.parse(jsonString);

  return ConnectionsPuzzle.parse(object);
}
