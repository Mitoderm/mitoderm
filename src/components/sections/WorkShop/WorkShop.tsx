import { FC } from 'react';
import styles from './WorkShop.module.scss';
import Intro from '../Intro/Intro';
import Benefit from '../Benefit/Benefit';
import CourseSelection from '../CourseSeletion/CourseSelection';
import InviteSection from '../InviteSection/InviteSection';
import StickyBar from '@/components/sharedUI/StickyBar/StickyBar';
import AgendaAccordion from '../AgendaAccordeon/AgendaAccordeon';
import EventExosomes from '../EventExosomes/EventExosomes';
import EventStats from '../EventStats/EventStats';
import EventContacts from '../EventContacts/EventContacts';
import EventUnique from '../EventUnique/EventUnique';
import Gallery from '../Gallery/Gallery';
import CourseDates from '../CourseDates/CourseDates';
import { Event } from '@/types';

interface Props {
  events: Event[];
}

const WorkShop: FC<Props> = ({ events }) => {
  return (
    <main className={styles.workshop}>
      <Intro />
      <CourseSelection />
      <StickyBar />
      <InviteSection />
      <AgendaAccordion />
      <CourseDates events={events} />
      <Benefit />
      <EventUnique />
      <Gallery isEventPage={true} />
      <EventExosomes />
      <EventStats />
      <EventContacts />
    </main>
  );
};

export default WorkShop;
