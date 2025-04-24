import React from "react"
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer"

type Props = {
  company: string
  destination: string
  requestor: string
  linehaul: string
  fuel: string
  accessorialTotal: number
  manualAdjustment: number
  totalRate: number
  validThrough: string
  specialInstructions?: string
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },
  heading: {
    fontSize: 18,
    marginBottom: 16,
    color: "#C42807",
  },
  section: {
    marginBottom: 10,
    lineHeight: 1.6,
  },
  label: {
    fontWeight: 700,
  },
})

const QuotePDF: React.FC<Props> = ({
  company,
  destination,
  requestor,
  linehaul,
  fuel,
  accessorialTotal,
  manualAdjustment,
  totalRate,
  validThrough,
  specialInstructions
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.heading}>📄 Quote Confirmation</Text>
      <Text style={styles.section}><Text style={styles.label}>Company:</Text> {company}</Text>
      <Text style={styles.section}><Text style={styles.label}>Destination ZIP:</Text> {destination}</Text>
      <Text style={styles.section}><Text style={styles.label}>Requestor Email:</Text> {requestor}</Text>
      <Text style={styles.section}><Text style={styles.label}>Linehaul:</Text> ${linehaul}</Text>
      <Text style={styles.section}><Text style={styles.label}>Fuel:</Text> ${fuel}</Text>
      <Text style={styles.section}><Text style={styles.label}>Accessorials:</Text> ${accessorialTotal.toFixed(2)}</Text>
      <Text style={styles.section}><Text style={styles.label}>Manual Adjustment:</Text> ${manualAdjustment.toFixed(2)}</Text>
      <Text style={styles.section}><Text style={styles.label}>Total Rate:</Text> ${totalRate.toFixed(2)}</Text>
      <Text style={styles.section}><Text style={styles.label}>Valid Through:</Text> {validThrough}</Text>
      {specialInstructions && (
        <Text style={styles.section}>
          <Text style={styles.label}>Special Instructions:</Text> {specialInstructions}
        </Text>
      )}
    </Page>
  </Document>
)

export default QuotePDF
