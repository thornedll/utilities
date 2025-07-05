export const hints = {
  Global: {
    UploadFile: "Choose file",
    CompareFiles: "Compare",
    ConvertFile: "Convert",
    ParseFile: "Parse",
    UploadFileHint: "or fill in the field below",
    UploadFileError: "Error uploading the file. Please try again.",
    Input: "Input",
    Output: "Output",
  },
  NotFound: {
    Header: "Nothing to see here...",
    BackToIndex: "Back to index page",
  },
  DateConverter: {
    ISOToUnixHelp:
      "<p>Choose date and time with timezone to convert to UNIX timestamp</p><p>Current date and time are chosen by default</p>",
    UnixToISOHelp:
      "<p>Enter UNIX timestamp to convert to ISO 8601 formatted date</p><p>Changing timezone will modify the result date and time</p>",
  },
  JsonConverter: {
    UploadHeader: "Upload file to convert",
    SettingsHeader: "Choose settings",
  },
  JsonDiff: {
    UploadHeader: "Upload files to compare",
    NoDifference: "No difference yet...",
    ParsingError: "Parsing JSON Error!",
  },
  JsonQuery: {
    UploadHeader: "Upload file to query",
    JsonQueryHeader: "JSON to Query",
    QueryHeader: "Query",
    ResultHeader: "Result",
    ParsingError: 'Invalid JSON in "Json to Query" field',
    QueryError: 'Invalid query in "Query" field',
  },
  CronParser: {
    ParseHeader: "Cron Expression",
    EnterCron: "Enter Cron Expression",
    EnterCronError:
      "A cron expression must have 5 - 7 segments separated by space",
    FormatCronError: "Wrong cron expression format",
    DescriptionHeader: "Cron Expression Description",
    DetailsHeader: "Parsing Details",
  },
  ImageConverter: {
    ImageUrlButton: "Enter Image URL",
    ModalHeader: "Enter the URL of an image",
    GetImageFromUrl: "OK",
    ImageUrlFormatError: "Incorrect URL",
  },
  RandomGenerators: {
    StringHeader: "String Generators",
    NumberHeader: "Number Generators",
    StringGenerators: {
      Grz: "Vehicle registration number",
      Uuid: "UUID",
    },
    NumberGenerators: {
      Integer: "Integer",
      Decimal: "Decimal",
    },
  },
  UrlConverter: {
    DecodeUrlHelp: "<p>Type or insert text to decode</p>",
    EncodeUrlHelp: "<p>Type or insert text to encode</p>",
    Decode: "Decode",
    Encode: "Encode",
  },
};
