import React, { useState, useEffect } from 'react'

import { Habit } from '@api'
import { Layout } from '@components/Layout'
import { SEO } from '@components/SEO'
import { Box, Flex } from '@components/Grid'
import { Button } from '@components/Button'
import { Heading, Text } from '@components/Typography'
import { Link } from '@components/Link'

import { MenuBar } from '@components/Navigation'
import catalogRaw from './catalog.json'

const Template = ({
  template: { title, action, trigger },
  onAddHandler,
  exists,
}) => {
  if (exists) {
    return null
  }

  return (
    <Flex flexDirection="row" width="100%">
      <Flex flexDirection="column" flex={1} my={2}>
        <Text>{title}</Text>
        <Text my={1} sx={{ color: 'gray.700' }}>
          {trigger}, {action}
        </Text>
      </Flex>
      <Flex alignItems="center">
        <Button variant="clear" onClick={onAddHandler}>
          add
        </Button>
      </Flex>
    </Flex>
  )
}

const Motivation = ({ title, templates, habits, updateHabits }) => (
  <Box>
    <Heading as="h2" fontSize={3} my={2} mt={4}>
      {title}
    </Heading>
    {templates.map((template, idx) => {
      const exists =
        [...habits.filter(h => h.templateId === template.templateId)].length > 0
      return (
        <Template
          key={idx}
          template={template}
          onAddHandler={async () => {
            const { title, templateId, trigger, action } = template
            const res = await Habit.create({
              title,
              templateId,
              description: `${trigger}, ${action}`,
            })
            if (res) {
              await updateHabits([
                { templateId: template.templateId },
                ...habits,
              ])
            }
          }}
          exists={exists}
        />
      )
    })}
  </Box>
)

const CatalogPage = () => {
  const [loadingState, setLoadingState] = useState('LOADING')
  const [habits, setHabits] = useState([])
  const [catalog, setCatalog] = useState([])
  const [motivations, setMotivations] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const resHabits = await Habit.getAll()
      const motivationList = catalogRaw.reduce((pV, cV) => {
        if (pV.motivation) {
          return [pV.motivation]
        }
        if (cV.motivation && pV.indexOf(cV.motivation) < 0) {
          return [cV.motivation, ...pV]
        }
        return pV
      })

      setMotivations(motivationList)
      setHabits(resHabits)
      setCatalog(catalogRaw)

      setLoadingState('SUCCESSFUL')
      return true
    }
    fetchData()
  }, [])

  if (loadingState === 'LOADING') {
    return (
      <Layout>
        <SEO title="New habit" />
        <MenuBar />
        <Flex width="100%" flexDirection="column">
          <Flex flexDirection="column">
            <Text textAlign="center" fontWeight="600" fontSize={4} m={5}>
              Loading ...
            </Text>
          </Flex>
        </Flex>
      </Layout>
    )
  }

  return (
    <Layout>
      <SEO title="New habit" />
      <MenuBar />
      <Box
        sx={{
          p: [3, 4],
          minHeight: '100vh',
          bg: 'gray.100',
          display: 'grid',
          alignItems: 'center',
        }}
      >
        <Box maxWidth="700px" mx="auto">
          <Heading as="h1" fontSize={5} my={3}>
            Select a habit
          </Heading>
          <Flex flexDirection="column">
            {motivations.map((motivation, idx) => (
              <Motivation
                key={idx}
                title={motivation}
                templates={catalog.filter(
                  item => item.motivation === motivation
                )}
                habits={habits}
                updateHabits={async data => {
                  setHabits(data)
                }}
              />
            ))}
          </Flex>

          <Flex flexDirection="column" alignItems="center" my={3}>
            <Link
              sx={{ fontWeight: 600, fontSize: 4 }}
              to="/dashboard/new/custom"
            >
              Custom Habit
            </Link>
          </Flex>
        </Box>
      </Box>
    </Layout>
  )
}
export default CatalogPage
