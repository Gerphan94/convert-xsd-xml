// Pure function to format XML string
// Usage: const result = formatXml(rawXml);

export const formatXml = (xml) => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "application/xml");
    const parseError = xmlDoc.getElementsByTagName("parsererror");
    if (parseError.length > 0) {
      throw new Error("Invalid XML");
    }
    const serializer = new XMLSerializer();
    const xmlStr = serializer.serializeToString(xmlDoc);

    // Pretty print logic
    let formatted = "";
    const reg = /(>)(<)(\/*)/g;
    const xmlFormatted = xmlStr.replace(reg, "$1\r\n$2$3");
    let pad = 0;
    xmlFormatted.split("\r\n").forEach((node) => {
      let indent = 0;
      if (node.match(/.+<\/\w[^>]*>$/)) {
        indent = 0;
      } else if (node.match(/^<\/\w/)) {
        if (pad !== 0) {
          pad -= 1;
        }
      } else if (node.match(/^<\w([^>]*[^\/])?>.*$/)) {
        indent = 1;
      } else {
        indent = 0;
      }

      const padding = new Array(pad + 1).join("  ");
      formatted += padding + node + "\r\n";
      pad += indent;
    });

    return formatted.trim();
  } catch (e) {
    return "Error: " + e.message;
  }
};