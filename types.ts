export type Entity = "blockchain" | "contract" | "report" | "statistic";

export type SlitherDetails = {
  success: boolean;
  error: null;
  results: {
    detectors?: {
      elements: {
        type: string;
        name: string;
        source_mapping: {
          start: number;
          length: number;
          filename_used: string;
          filename_relative: string;
          filename_absolute: string;
          filename_short: string;
          is_dependency: boolean;
          lines: number[];
          starting_column: number;
          ending_column: number;
        };
        type_specific_fields: {
          parent: {
            type: string;
            name: string;
            source_mapping: {
              start: number;
              length: number;
              filename_used: string;
              filename_relative: string;
              filename_absolute: string;
              filename_short: string;
              is_dependency: boolean;
              lines: number[];
              starting_column: number;
              ending_column: number;
            };
          };
          signature: string;
        };
      }[];
      description: string;
      markdown: string;
      first_markdown_element: string;
      id: string;
      check: string;
      impact: string;
      confidence: string;
    }[];
  };
};
