package tim.wat.darts.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tim.wat.darts.objects.ContestObject;
import tim.wat.darts.repositories.ContestRepository;
import tim.wat.darts.repositories.PlayerRepository;
import tim.wat.darts.source.Contest;

@RestController
public class ContestController {
    @Autowired
    ContestRepository contestRepository;
    @Autowired
    PlayerRepository playerRepository;
    @RequestMapping(value = "/setContest", method = RequestMethod.POST)
    @ResponseBody
    public ContestObject setContest(@RequestParam(value = "contest_name", defaultValue = "") String contest_name,
                                    @RequestParam(value = "contest_pass", defaultValue = "") String contest_pass,
                                    @RequestParam(value = "login", defaultValue = "") String login
    ) {
        Contest contest = new Contest(contest_name, contest_pass);
        contest.getPlayers().add(playerRepository.findByLogin(login));
        contestRepository.save(contest);
        return new ContestObject(contest.getId(), contest.getContestName());
    }

    @RequestMapping(value = "/joinContest", method = RequestMethod.POST)
    @ResponseBody
    public ContestObject joinMatch(@RequestParam(value = "contest_name", defaultValue = "") String contest_name,
                             @RequestParam(value = "contest_pass", defaultValue = "") String contest_pass,
                             @RequestParam(value = "login", defaultValue = "") String login
    ) {
       Contest contest = contestRepository.findByContestNameAndContestPass(contest_name,contest_pass);
        contest.getPlayers().add(playerRepository.findByLogin(login));
        contestRepository.save(contest);
        return new ContestObject(contest.getId(), contest.getContestName());
    }
}
